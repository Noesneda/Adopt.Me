/* import mercadopago from "mercadopago"; */
import React from "react";
import axios from "axios";

const MercadoPago = (prod) => {
  
  return (
      <div>
      <button type="submit"
        onClick={() => {
          axios.post("http://localhost:3001/pagosMP/payment", prod).then((res) => window.location.href = res.data.response.body.init_point)
        }}>Mercado Pago</button>
      </div>
  )
      
}

export default MercadoPago

/* 
const mercadopago = new MercadoPago(
  "APP_USR-9d7a8c51-f5d6-4e3b-a40b-3054768ac269",
  {
    locale: "es-AR", // The most common are: 'pt-BR', 'es-AR' and 'en-US'
  }
);
let order = {
  total: 0,
  items: [],
};
const backMercadoP = async () => {
  try {
    order.shipping = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
    };

    const preference = await axios
      .get("/pagosMp/checkout", {
        method: "post",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .json();

    var script = document.createElement("script");

    // The source domain must be completed according to the site for which you are integrating.
    // For example: for Argentina ".com.ar" or for Brazil ".com.br".
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.type = "text/javascript";
    script.dataset.preferenceId = preference.preferenceId;
    script.setAttribute("data-button-label", "Pagar con Mercado Pago");
    document.getElementById("root").innerHTML = "";
    document.querySelector("#root").appendChild(script);

    document.getElementById("name").disabled = true;
    document.getElementById("email").disabled = true;
  } catch {
    window.alert("No se puede hacer el pago");
  }
};
 */


/* 
import {useDispatch} from "react-redux"
import pagosMercadoPago from  "../../Actions/pagosMercadoPago.js"
export default function MercadoPago() {
    const dispatch = useDispatch()
    const handleMercadoPago = (e) => {
        e.preventDefault();
        dispatch(pagosMercadoPago())
    }
    return (
        <div>
        <button type="submit" onClick={ (e) => handleMercadoPago(e)}>Mercado Pago</button>
    </div>
    )
        
} */
