import React from "react";
// import stl from "../Card/Card.module.css";
import "./CardPerdidos.css";
import { Link } from "react-router-dom";
import perdido from "../../Imagenes/perdida.jpg"

export default function CardPerdidos({ descripcion, id, tama, estado, imagen}) {

  if(!imagen) {
  return (
    <div class="cardstodas">
    <div class="cards">
  <div class="viendo">
    <div href="" class="card">
    <div class="link">
            <Link to = {`/animalesPerdidos/${id}`}>
      <img src={perdido} class="card__image" alt="" />
            </Link>
            </div>
      <div class="card__overlay">
        <div class="card__header">
          <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
          <div class="card__thumb" />
          <div class="card__header-text">
            <div class="card__title">Estado: {estado}</div>            
            <div class="card__status">Tamaño: {tama}</div>
          </div>
        </div>
        <p class="card__description">{descripcion}</p>
      </div>
    </div>      
  </div>
</div>
    </div>
  )
  } else {
    return (
      <div class="cardstodas">
      <div class="cards">
    <div class="viendo">
      <div href="" class="card">
      <div class="link">
              <Link to = {`/animalesPerdidos/${id}`}>
        <img src={imagen} class="card__image" alt="" />
              </Link>
              </div>
        <div class="card__overlay">
          <div class="card__header">
            <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
            <div class="card__thumb" />
            <div class="card__header-text">
              <div class="card__title">{estado}</div>            
              <div class="card__status">{tama}</div>
              {/* <div>{id}</div> */}
            </div>
          </div>
          <p class="card__description">{descripcion}</p>
        </div>
      </div>      
    </div>
  </div>
      </div>
    );
  }
}
