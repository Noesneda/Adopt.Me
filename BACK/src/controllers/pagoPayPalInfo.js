require('dotenv').config();
const {PAYPAL_API,PAYPAL_CLIENT_ID, PAYPAL_SECRET} = process.env;
const axios = require('axios');
const infoPagosPayPal = {};



getOrden = async (req,res)=>{
    try {
        const orden = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: '1'
                    },
                    description: 'Donacion',
                },
            ],
            application_context: {
                brand_name: 'adoptMe.com',
                landing_page: 'LOGIN',
                user_action: 'PAY_NOW',
                return_url: 'http://localhost:3001/pagos/capturar-orden',
                cancel_url: 'http://localhost:3001/pagos/cancelar-orden',
            }
        };

       const params = new URLSearchParams() //objeto global de Nodejs
       params.append('grant_type', 'client_credentials') //parametros de paypal

        const {data: {access_token}} = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', params , {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
            username: PAYPAL_CLIENT_ID,
            password: PAYPAL_SECRET,
        }
       });

       const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, orden, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        console.log(response.data.links[1].href);
        return res.status(200).json(response.data.links[1].href)    
    } catch (error) {
        return res.status(400).send('Ups! Algo salió mal :(')      
    }
};


getCapturarOrden = async (req,res)=>{
    try {
        const {token} = req.query;
        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
            auth: {
                username: PAYPAL_CLIENT_ID,
                password: PAYPAL_SECRET,
            }
        })
        console.log(response.data);
        res.send('capturar orden')     
    } catch (error) {        
    }
};


getCancelarOrden = async (req,res)=>{
    try {
        res.send('cancelar orden')         
    } catch (error) {        
    }
}

module.exports = infoPagosPayPal;