import React from "react";
import { Link } from "react-router-dom";
import stl from "../Card/CardFavoritos.module.css";


export default function CardFavoritos({nombre, favoritos}) {

    return (

        <div>
            <Link to ={`/comentario/${favoritos}`}>  
            <div className={stl.nombreFavorito}>{nombre}</div>
            </Link>
        </div>
    )
}