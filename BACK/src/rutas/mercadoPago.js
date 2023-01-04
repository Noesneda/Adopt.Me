const express = require("express");
const app = express();
const mercadopago = require("mercadopago");
require('dotenv').config();

//const bodyParser = require("body-parser") 

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACC_VEN,
});


app.post("/payment",  (req, res) => {
    const prod = req.body;
    let preference = {
          items: [
          {
            id: "item-ID-1234",
            title: prod.title,
            description: prod.description,
            picture_url: prod.image,
            unit_price: prod.price,
            quantity: 1,
            currency_id: "ARS",
          },
        ],
         
        back_urls: {
            success: "http://localhost:3001/pagosMp/success",
            failure: "http://localhost:3001/pagosMp/failure",
            pending: "http://localhost:3001/pagosMp/pending"
        }, 
        auto_return: "approved",
        bunary_mode: true,

        notification_url: "https://d41e-181-27-193-97.sa.ngrok.io/notificar",
        statement_descriptor: "MINEGOCIO",
        expires: false,
      };
      
      mercadopago.preferences
        .create(preference)
        .then((response) => res.status(200).send({response}))
        .catch((error) => res.status(404).send({error: error.message}))
});


app.get("/success", (_req, res) => {
    try {
         res.send("Orden ok");
    } catch (error) {        
    }
});

app.get("/pending", (_req, res) => {
    try {
         res.send("Pago pendiente");
    } catch (error) {        
    }
});

app.get("/failure", (_req, res) => {
    try {
         res.send("Falló el pago");
    } catch (error) {        
    }
});


 /*app.get("/notificar", (_req, res) => {
    try {
         res.send("se notificó");
    } catch (error) {        
    }
});


app.get("/cancelar-pago", (_req, res) => {
    try {
    res.send("orden cancelada");
    } catch (error) {        
    }
});


 const deletePayment = async function (paymentId){
    const {token} = await store.getState()
    const {data} = await axios.delete(`${endpoint}/${paymentId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
} */


module.exports = app;


/* ASI ESTABA ANTES:

app.get("/checkout",  (_req, res) => {
    let preference = {
        
          items: [
          {
            id: "item-ID-1234",
            title: "Mi donacion",
            description: "Acá podes hacer tu donacion para que ADOPTME siga creciendo",
            unit_price: 10,
            quantity: 1,
            currency_id: "ARS",
          },
        ],
         
        back_urls: {
            success: "http://localhost:3001/pagosMp/success",
            failure: "http://localhost:3001/pagosMp/failure",
            pending: "http://localhost:3001/pagosMp/pending"
        }, 
        auto_return: "approved",
        payment_methods: {
            excluded_payment_methods: [
                {
                    id: "master"
                }
            ],
            excluded_payment_types: [
                {
                    id: "ticket"
                }
            ],
            installments: 12
        },

        notification_url: "https://d41e-181-27-193-97.sa.ngrok.io/notificar",
        statement_descriptor: "MINEGOCIO",
        external_reference: "Reference_1234",
        expires: true,
        expiration_date_from: "2018-02-01T12:00:00.000-04:00",
        expiration_date_to: "2023-12-28T12:00:00.000-04:00"
         
    
      };
      
      mercadopago.preferences
        .create(preference)
        .then(function (response) {
          // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
          console.log(response.body.init_point);//.body.init_point
          res.send(`<a href="${response.body.init_point}"> Clickea aquí para pagar </a>`);
        })
        .catch(function (error) {
          console.log(error);
        });

});

app.get("/success", (_req, res) => {
    try {
         res.send("Orden ok");
    } catch (error) {        
    }
});

app.get("/pending", (_req, res) => {
    try {
         res.send("Pago pendiente");
    } catch (error) {        
    }
});

app.get("/failure", (_req, res) => {
    try {
         res.send("Falló el pago");
    } catch (error) {        
    }
});


 app.get("/notificar", (_req, res) => {
    try {
         res.send("se notificó");
    } catch (error) {        
    }
});


app.get("/cancelar-pago", (_req, res) => {
    try {
    res.send("orden cancelada");
    } catch (error) {        
    }
});


const deletePayment = async function (paymentId){
    const {token} = await store.getState()
    const {data} = await axios.delete(`${endpoint}/${paymentId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
} */