const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // pour faire des requêtes HTTP
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// Remplacez par vos clés API et les URL fournies par MTN
const MTN_API_KEY = 'votre_cle_api';
const MTN_API_URL = 'https://api.mtn.com/v1/moneytransfer';

app.post('/process_payment_mobile_money', async (req, res) => {
    const { phoneNumber, amount } = req.body;

    try {
        const response = await fetch(`${MTN_API_URL}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MTN_API_KEY}`,
            },
            body: JSON.stringify({
                amount: amount,
                currency: 'USD',
                recipient: phoneNumber,
                // Ajoutez d'autres paramètres nécessaires pour l'API MTN
            }),
        });

        const data = await response.json();

        if (data.success) {
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false, error: data.error });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
