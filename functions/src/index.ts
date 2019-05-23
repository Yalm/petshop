import { https } from 'firebase-functions';
// import axios from 'axios';
// import { environment } from './environments/environment';
import { auth, db } from './db/index';
// import { setApiKey, send } from '@sendgrid/mail';
import { ShoppingCart } from './models/ShoppingCart.model';
import { firestore as field } from 'firebase-admin';

const cors = require('cors')({ origin: true });

// const SENDGRID_API_KEY = config().sendgrid.key;
// setApiKey('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');

// export const createOrder = firestore.document('carts/{cartId}').onCreate((snap, context) => {
//     send({
//         to: 'renzomanuelaws@gmail.com',
//         from: 'kayness@gmail.com',
//         subject: 'Nuevo Pedido',
//         templateId: 'd-11b418c1332c41f08cbd6a75c185b9c8',
//         substitutionWrappers: ['{{', '}}'],
//         substitutions: { name: 'renzo' }
//     })
// });

export const order = https.onRequest(async (req, res) => {

    cors(req, res, async () => {
        if (!req.headers.authorization) {
            res.status(403).send('Unauthorized');
            return;
        }

        let decodedIdToken;
        try {
            const idToken = req.headers.authorization.split('Bearer ')[1];
            decodedIdToken = await auth.verifyIdToken(idToken);
        } catch (error) {
            res.status(403).send('Unauthorized');
            return;
        }

        if (validDataOrder(req.body).length > 0) {
            res.status(422).json(validDataOrder(req.body));
            return;
        }

        const cart = await db.collection('carts').doc(req.body.cart_id).get();
        if (!cart.exists) {
            res.status(422).json({ name: 'cart_id', msg: 'element does not exist' });
            return;
        }

        const SHOPPING_CART: ShoppingCart = { id: cart.id, total: 0, ...cart.data() } as any;

        for (const item of SHOPPING_CART.items) {
            SHOPPING_CART.total += item.price * item.quantity;
        }

        try {
            // const culqi = await axios.post('https://api.culqi.com/v2/charges', {
            //     amount: SHOPPING_CART.total * 100,
            //     currency_code: 'PEN',
            //     description: 'Petshop Veterinaria Huancayo',
            //     email: decodedIdToken.email,
            //     source_id: req.body.culqi_token,
            // }, {
            //         headers: {
            //             'Content-type': 'application/json',
            //             Authorization: `Bearer ${environment.CULQI_SECRET_KEY}`
            //         }
            //     })

            const ORDER = await db.collection('orders').add({
                customer: db.doc(`customers/${decodedIdToken.uid}`),
                plus_info: req.body.plus_info || '',
                state: db.doc('states/4'),
                created_at: field.FieldValue.serverTimestamp(),
                products: SHOPPING_CART.items
            });

            const batch = db.batch();

            batch.set(db.doc(`payments/${ORDER.id}`), {
                amount: SHOPPING_CART.total,
                payment_type: db.doc('paymentTypes/1'),
            });

            for (const product of SHOPPING_CART.items) {
                batch.update(db.doc(`products/${product.id}`), {
                    stock: product.stock - product.quantity
                });
            }

            batch.update(db.doc(`carts/${SHOPPING_CART.id}`), {
                items: []
            });

            await batch.commit();

            res.status(200).json({
                id: ORDER.id,
                total: SHOPPING_CART.total,
                products: SHOPPING_CART.items,
                state: '4'
            });

        } catch (error) {
            if (error.response) {
                res.status(422).json(error.response.data);
                return;
            }
            console.error(error)
            res.status(500).json({ status: 500, msg: 'ERROR' });
            return;
        }

        // SEND EMAIL
        // send({
        //     to: decodedIdToken.email,
        //     from: 'Petshop.com <no-reply@petshop.com>',
        //     subject: 'Nuevo Pedido',
        //     templateId: 'd-11b418c1332c41f08cbd6a75c185b9c8',
        //     substitutionWrappers: ['{{', '}}'],
        //     dynamicTemplateData: SHOPPING_CART
        // });

    });
});

function validDataOrder(data: any): any[] {
    const ARRAY_ERROR = new Array();

    if (!data.culqi_token) {
        ARRAY_ERROR.push({ name: 'culqi_token', msg: 'this field is required.' });
    }
    if (!data.cart_id) {
        ARRAY_ERROR.push({ name: 'cart_id', msg: 'this field is required.' });
    }
    return ARRAY_ERROR;
}