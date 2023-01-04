//  const express = require('express')
//  const Stripe = require('stripe')
//  const stripe = new Stripe("sk_test_51M9wCWDFa6jLCwa9MZXEbHmyUy2Jw6LfVGcx5m8mb2yEyI6S64nrpgQrsQ9AUfhoDIiz2stAkQNaxZJ8U2GsLXJk00Q2TjSi5r")
// const infoStripe = {}

// app.post('/payment', async (req, res) => {
//     let status, error;
//     const { token, amount } = req.body;
//     try {
//       await Stripe.charges.create({
//         source: token.id,
//         amount,
//         currency: 'USD',
//         description:"",
//         payment_method: id,
//       });
//       status = 'success';
//     } catch (error) {
//       console.log(error);
//       status = 'Failure';
//     }
//     res.json({ error, status });
//   });

//  module.export = infoStripe