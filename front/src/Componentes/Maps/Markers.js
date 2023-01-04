import { useEffect } from "react";
import React from "react-dom";
import { Marker, Popup } from "react-leaflet";
import { IconLocation } from "../Maps/IconLocation";
import { useDispatch, useSelector } from "react-redux";
// import getLocations from "../../Actions/getLocation"
// import packageInfo from '../Maps/data.json';
import getanimales from "../../Actions/getmascotas";
import { Link } from "react-router-dom";
import stl from "../Maps/Maps.module.css";
import { IconLocationDogs } from "../Maps/IconLocationDogs";
import { IconLocationCats } from "../Maps/IconLocationCats";

export default function Markers() {

  const dispatch = useDispatch()
  const gps = useSelector((state) => state.animales);
  const sinAdopcion = gps
  const sinAdoptar = sinAdopcion.filter(({ adoptado }) => adoptado === false)
  console.log("sinAdoptar", sinAdoptar)

    useEffect(() => {
      dispatch(getanimales())
    }, [dispatch])


if (sinAdoptar.perro === true) {
    return (
    
      <>
      {sinAdoptar.map(p => {

     return (
      <Marker
      position={[p.lat, p.lng]} 
      icon={IconLocationDogs}> 
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
  } else if (sinAdoptar.gato === true) {
    return (
    
      <>
      {sinAdoptar.map(p => {

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
    
  }