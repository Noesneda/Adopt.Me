import React, { useState } from "react";
import PayPal from "../Paypal/Paypal";
import stl from "../Paypal/Purchase.module.css";



const Purchases = () => {
  const [state, setState] = useState({
    value: 5.0,
    checkout: false,
    desc: "Test"
  });

  const renderCard = (title, desc, value) => {
    return (
      <div >
        <div>
          <div >
            {title}
          </div>
        </div>
        <div>
          <button className={stl.botonespaypal}
            onClick={() =>
              setState({
                value,
                desc,
                checkout: true
              })
            }
            color="primary"
          >
            Donar U$S 1
          </button>
        </div>

      </div>
    );
  };

console.log("estoy en el purchase")
  return (
    
    <div >
      
      {state.checkout ? (
        <div>
          <PayPal cost={state.value} desc={state.desc} />
  
        </div>
      ) : (
        <div >
          {renderCard("Donar con Paypal")}
        </div>
      )}
    </div>
    
   
  );
};
export default Purchases;