import React from "react";
import MercadoPago from "../MercadoPago/MercadoPago";
// import { Link } from "react-router-dom";
// import Footer from "../Footer/Footer";
// import Metamask from "../Metamask/Metamask";
import NavBar from "../NavBar/NavBar";
// import Paypal from "../Paypal/Paypal";
// import Purchases from "../Paypal/Purchase";
// import Purchases2 from "../Paypal/Purchase copy";
// import Purchases3 from "../Paypal/Purchase copy 2";
// import App from "../Stripes/Stripe";
import stl from "./Donacion.module.css";
// import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from "../Stripes/Stripe";

// const stripePromise = loadStripe("pk_test_51M9wCWDFa6jLCwa92xpEczTJ20PPSzL6XTQmi8OZan1aNkHFGAv9A0AX7OJIw8wJf1Ru59PdJrRpGnnBvopiFK5T000lEuF7rB")


export default function Donar() {
    

    return (
        <div>
            <NavBar />
            <div className={stl.pagina}>  
            
            <form className={stl.formulario}>

                <h3 className={stl.titulo}>Adopt.Me - Donaciones</h3>
           
           <div className={stl.datos}>

           </div>

           <div className={stl.metodosPago}>
            

                {/* <div className={stl.botonmetamask}>
                <Metamask />
                </div> */}
                <br></br>
                <a href="https://www.paypal.com/donate/?hosted_button_id=64TE6LEKG24ES">
                    Hace Click Aqui</a>  
                <div className={stl.paypal} >👆
                </div>

                <a href="https://mpago.la/1frR19s">
                    Donacion unica vez</a>  
                    <div>

                    <a mp-mode="dftl" href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c938084852a2e0f018554a4adcb132a" name="MP-payButton" class='blue-ar-l-rn-none'>Suscribirme a donacion mensual</a>

                    </div>
                {/* <div>
                    <MercadoPago /> 
                </div> */}
                {/* <div> */}
                    {/* <Purchases />
                </div>

                <div>
                    <Purchases2 /> 
                </div>
               

                <div>
                    <Purchases3 /> */}
                {/* </div> */}

                {/* <div className={stl.botonstripes}>
                <Elements stripe={stripePromise}>
                    <div >
                        <div >
                        <div >
                    <CheckoutForm />
                        </div>
                        </div>
                    </div>    
                    </Elements>
                                </div> */}

             </div>
        
            </form>
            </div>
            {/* <Footer /> */}
        </div>
        
        
    )
}