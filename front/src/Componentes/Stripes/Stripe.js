// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
// import axios from 'axios'

// // import 'bootswatch/dist/litera/bootstrap.min.css'


// const stripePromise = loadStripe("pk_test_51M9wCWDFa6jLCwa92xpEczTJ20PPSzL6XTQmi8OZan1aNkHFGAv9A0AX7OJIw8wJf1Ru59PdJrRpGnnBvopiFK5T000lEuF7rB")

// const CheckoutForm = () => {

//      const [loading, setLoading] = useState(false)
//   /* const [email, setEmail] = useState("");
//   const [name, setName] = useState(""); */

//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (e) =>{
//     e.preventDefault();

//     const {error, paymentMethod} = await stripe.createPaymentMethod({
//       type:'card',
//       card:elements.getElement(CardElement)

//     });
//     setLoading(true)

//     if(!error){
//       const { id } = paymentMethod;

//       try {
//         const {data} = await axios.post('http://localhost:3001/api/checkout', {
//         id,
//         amount: (20 * 100),
//         /* email: "email",
//         name: "name" */
//       })

//       console.log(data);

//       elements.getElement(CardElement).clear();
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     setLoading(false)
//   }

//   return <form onSubmit={handleSubmit} className="card card-body">
//      {/* <img 
//      src={`https://i.pinimg.com/736x/35/23/43/352343ff27c32d65f42f976abb320efb.jpg`} 
//      alt="Adopt.me" 
//      className="img-fluid"/> */}

//      <h3 className="text-center my-2">Tu Donativon Salva</h3>

//     <div className="form-group">
//       <CardElement className="form-control" />
//     </div>

//     <button className="btn btn-success" disabled={!stripe}>
//       {loading ? (
//         <div className="spinner-border text-light" role="status">
//     <span className='sr-only'></span>
//         </div>
//       ) : (
//         "Donativo"
//       )}
//     </button>
//   </form>
// }

// export default CheckoutForm