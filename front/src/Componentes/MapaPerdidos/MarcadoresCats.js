import { useEffect } from "react";
import React from "react-dom";
import { Marker, Popup } from "react-leaflet";
// import { IconLocation } from "../Maps/IconLocation";
import { IconLocationCats } from "../Maps/IconLocationCats";
import { useDispatch, useSelector } from "react-redux";
// import getLocationsPerdidos from "../../Actions/getLocationPerdidos";
import getAnimalesPerdidos from "../../Actions/getAnimalesPerdidos";
import stl from "../MapaPerdidos/MapaPerdido.module.css";
import { Link } from "react-router-dom";

export default function MarkersLostCats() {

  const dispatch = useDispatch()
  const gps = useSelector((state) => state.animalesPerdidos);
  const perdidos = gps;
  const sinEncontrar = perdidos.filter(({ adoptado }) => adoptado === false)
  const gatos = sinEncontrar.filter(({ gato }) => gato === true)

    useEffect(() => {
      dispatch(getAnimalesPerdidos())
    }, [dispatch])


    return (
    
      <>
      {gatos.map(p => {

     return (
      <Marker
      position={[p.lat, p.lng]} 
      icon={IconLocationCats}>
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

  