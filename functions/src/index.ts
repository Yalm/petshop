import { https } from 'firebase-functions';
// import axios from 'axios';
// import { environment } from './environments/environment';
import { auth, db } from './db/index';
// import { setApiKey, send } from '@sendgrid/mail';
import { firestore as field } from 'firebase-admin';
import { CartItem } from './models/CartItem.model';

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

        const items: CartItem[] = req.body.items;
        let total = 0;

        for (const item of items) {
            total += item.price * item.quantity;
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
                products: items,
                payment: {
                    amount: total,
                    payment_type: db.doc('paymentTypes/1')
                }
            });

            const batch = db.batch();

            for (const product of items) {
                batch.update(db.doc(`products/${product.id}`), {
                    stock: product.stock - product.quantity
                });
            }

            await batch.commit();

            res.status(200).json({
                id: ORDER.id,
                total,
                products: items,
                state: '4'
            });

        } catch (error) {
            if (error.response) {
                res.status(422).json(error.response.data);
                return;
            }
            console.error(error);
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

    if (!data.items) {
        ARRAY_ERROR.push({ name: 'items', msg: 'this field is required.' });
    }

    if (!Array.isArray(data.items)) {
        ARRAY_ERROR.push({ name: 'items', msg: 'this field must be colección.' });
    }
    return ARRAY_ERROR;
}
