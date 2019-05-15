import { firestore, https, config } from 'firebase-functions';
import axios from 'axios';
import { environment } from './environments/environment';
import { auth } from './db/index';
import { setApiKey, send } from '@sendgrid/mail';

const cors = require('cors')({ origin: true });

const SENDGRID_API_KEY = config().sendgrid.key;
setApiKey(SENDGRID_API_KEY);

export const createOrder = firestore.document('carts/{cartId}').onCreate((snap, context) => {
    return send({
        to: 'renzomanuelc@gmail.com',
        from: 'kayness@gmail.com',
        subject: 'Nuevo Pedido',
        templateId: 'd-11b418c1332c41f08cbd6a75c185b9c8',
        substitutionWrappers: ['{{','}}'],
        substitutions: { name: 'renzo' }
    });
});

export const order = https.onRequest((req, res) => {

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
        let culqi: any;
        try {
            culqi = await axios.post('https://api.culqi.com/v2/charges', {
                amount: 10000,
                currency_code: "PEN",
                description: 'Petshop Veterinaria Huancayo',
                email: decodedIdToken.email,
                source_id: req.body.token,
            }, {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${environment.CULQI_SECRET_KEY}`
                    }
                })
            res.status(200).json({ status: 200, data: culqi.data });
        } catch (error) {
            if (error.response) {
                res.status(422).json(error.response.data);
                return;
            }
            res.status(500).json({ status: 500, msg: 'ERROR' });
            return;
        }
    });
});