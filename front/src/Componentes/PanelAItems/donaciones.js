import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBarPAdmin from "../PanelAdministrador/NavBarPAdmin";
import getpagos from "../../Actions/getpaypal";
import "./donaciones.css";

export default function Donaciones() {

  const dispatch = useDispatch()
  const donaciones = useSelector((state) => state.paypal)
  console.log("donaciones", donaciones)
  
  useEffect(() => {
    dispatch(getpagos())
  }, [dispatch])
  
  
  const total = donaciones.map(({ donacion }) => donacion)
  let totalDonaciones = total.reduce((a, b) => a + b, 0);
  

  return(

    <div>
        <NavBarPAdmin />
        <div class="donaciones">Total de donaciones: U$S {totalDonaciones}</div>
    </div>
  )
}

