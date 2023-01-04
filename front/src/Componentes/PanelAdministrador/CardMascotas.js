import React from "react";
import "../PanelAdministrador/CardMascotas.module.css";


export default function CardMascotas({ nombre, estado }) {

  return (
       <div>
        <div>Nombre: {nombre} </div>
        <div>Estado: {estado}</div>
       </div>
    );
  }
