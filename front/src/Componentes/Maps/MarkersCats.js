import { useEffect } from "react";
import React from "react-dom";
import { Marker, Popup } from "react-leaflet";
// import { IconLocation } from "./IconLocation";
import { useDispatch, useSelector } from "react-redux";
// import getLocations from "../../Actions/getLocation"
// import packageInfo from '../Maps/data.json';
import getanimales from "../../Actions/getmascotas";
import { Link } from "react-router-dom";
import stl from "../Maps/Maps.module.css";
// import { IconLocationDogs } from "./IconLocationDogs";
import { IconLocationCats } from "./IconLocationCats";

export default function MarkersCats() {

  const dispatch = useDispatch()
  const gps = useSelector((state) => state.animales);
  const sinAdopcion = gps
  const sinAdoptar = sinAdopcion.filter(({ adoptado }) => adoptado === false)
  const gatos = sinAdoptar.filter(({ gato }) => gato === true)
  console.log("sinAdoptar", gatos)

    useEffect(() => {
      dispatch(getanimales())
    }, [dispatch])

    return (
    
      <>
      {gatos.map(p => {

     return (
      <Marker
      position={[p.lat, p.lng]} 
      icon={IconLocationCats}> 
      <Popup>
        <Link to ={`/animales/${p._id}`}>
        <img className={stl.imagenMarcador} src={p.imagen} alt="" /><br></br>
        Nombre: {p.nombre}<br></br>
        Edad: {p.edad}<br></br>
        </Link>
      </Popup>
      </Marker>
     )
    })}
      </>
    )
  }
    
