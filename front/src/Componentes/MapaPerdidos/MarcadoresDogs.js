import { useEffect } from "react";
import React from "react-dom";
import { Marker, Popup } from "react-leaflet";
// import { IconLocation } from "../Maps/IconLocation";
import { IconLocationDogs } from "../Maps/IconLocationDogs";
import { useDispatch, useSelector } from "react-redux";
// import getLocationsPerdidos from "../../Actions/getLocationPerdidos";
import getAnimalesPerdidos from "../../Actions/getAnimalesPerdidos";
import stl from "../MapaPerdidos/MapaPerdido.module.css";
import { Link } from "react-router-dom";

export default function MarkersLostDogs() {

  const dispatch = useDispatch()
  const gps = useSelector((state) => state.animalesPerdidos);
  const perdidos = gps;
  const sinEncontrar = perdidos.filter(({ adoptado }) => adoptado === false)
  const perros = sinEncontrar.filter(({ perro }) => perro === true)

    useEffect(() => {
      dispatch(getAnimalesPerdidos())
    }, [dispatch])


    return (
    
      <>
      {perros.map(p => {

     return (
      <Marker
      position={[p.lat, p.lng]} 
      icon={IconLocationDogs}>
        <Popup>
        <Link to ={`/animalesPerdidos/${p._id}`}>
          <img className={stl.imagenMarcador} src={p.imagen} alt=""/><br></br>
          estado:{p.estado}
          </Link>
        </Popup>
      </Marker>
     )
    })}
      </>
    )
    
  }

  //

  