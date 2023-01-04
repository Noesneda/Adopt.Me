import React, { useState } from "react";

import stl from "../Paypal/Purchase.module.css";
import PayPal2 from "./Paypal copy";



const Purchases2 = () => {
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
            Donar U$S 5
          </button>
        </div>

      </div>
    );
  };


  return (
    
    <div >
      {state.checkout ? (
        <div>
                 <PayPal2 cost={state.value} desc={state.desc} />
        </div>
      ) : (
        <div >
          {renderCard("Donar con Paypal")}
        </div>
      )}
    </div>
    
   
  );
};
export default Purchases2;