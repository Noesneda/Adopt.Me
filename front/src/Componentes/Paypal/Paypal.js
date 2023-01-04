import { useEffect, useState } from "react";
import "./Paypal.css";
import Toast from 'light-toast';
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import postPaypal from "../../Actions/postPaypal";

export default function PayPal({ cost, desc }) {
  const [completed, setCompleted] = useState(false);
  const [paid, setPaid] = useState(false);
  const navigate = useNavigate();
  const paypal = useSelector((state) => state.paypal)
  const dispatch = useDispatch()

  const [pago, setPago] = useState({
    donacion: 1
  })
  console.log("pago", pago)


  function handlePago(e) {
    e.preventDefault();
    setPago({
      donacion: 1
    })
  }

  useEffect(() => {
    window.paypal?.Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: desc, 
                amount: {
                  currency_code: "USD",
                  value: 1 
                }
              }
            ]

          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaid(true);
          setCompleted(true);
          dispatch(postPaypal(pago))
          console.log("order", order);
        },
        onError: (err) => {
          setCompleted(true);
          console.error(err);
        }
      })
      .render("#paypal-button-container");
  }, [cost, desc]);

  return (
    <div className="Processing">
      Donar U$S 1
      <div onClick={handlePago} id="paypal-button-container" /> 
      {completed &&
        (paid ? (    
               
          Toast.success("Su pago fue realizado con exito", 1000, () => {
            navigate("/homepage")
        })
        ) : (
       
          Toast.fail("Hubo un problema con su pago. Revise los datos e intente nuevamente", 1000, () => {})
        ))}
    </div>
  );
}