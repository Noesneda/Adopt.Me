import React, { useEffect, useState } from "react"
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "./Maps.css";
import {IconLocation} from "./IconLocation";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import createLocation from "../../Actions/createLocation";
import { useDispatch } from "react-redux";
import Markers from "./Markers";
import stl from "../Maps/Maps.module.css";
import Toast from 'light-toast';

export default function MapView() {

    const dispatch = useDispatch()

    /////////////////////////////////////////////////////////// TOMA MI UBICACION ACTUAL SEGUN MI GPS ///////////////////

    const [geo, setGeo] = useState({
        lng: -61.043988,
        lat: -34.7361,
    })

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setGeo({
                    lng: position.coords.longitude,
                    lat: position.coords.latitude
                })
            }, 
            function(error) {
                console.log(error)
            }, {
                enableHighAccuracy: true
            });
    }, [])

    ///////////////////////////////////////////////////// GUARDA LA UBICACION EN LA BASE DE DATOS //////////////////////

    const [location, setLocation] = useState({
            lat: "",
            lng: ""
    })

    function handleLocation() {
        setLocation({
                lat: geo.lng,
                lng: geo.lat
        })
       
        Toast.success("Ubicacion Establecida. Por favor seleccione 'Guardar mi Ubicacion'", 1500, () => {});
    }

    function handleLocation2() {
        setLocation({
                lat: geo.lng,
                lng: geo.lat
        })
        Toast.success("Ubicacion Guardada con exito. Por favor seleccione 'Confirmar y volver'", 1500, () => {});
    }

    function handleSubmit() {
        dispatch(createLocation(location))
    }


    /////////////////////////////////////////////////// GUARDA MI UBICACION ACTUAL EN UN ESTADO Y RENDERIZO  ///////

    const position = [geo.lat, geo.lng]

    const local = position

    function FlyMapTo() {

      const map = useMap()
  
      useEffect(() => {
          map.flyTo(local)
          
      }, {enableHighAccuracy: true})
  
      return null
  }


    return (    
    <div>
        <NavBar />
      
        <p>Por favor. Para guardar su ubicacion exitosamente<br></br>
        Primero seleccione "Establecer mi Ubicacion", y luego "Guardar mi Ubicacion".</p>
        <p>Finalmente "Confirmar y Volver"</p>
        <div className={stl.botones}>
        <button className={stl.botonMapa2} onClick={handleLocation}>Establecer mi Ubicacion</button>
        <button className={stl.botonMapa2} onClick={handleLocation2}>Guardar mi Ubicacion</button>
        <Link to ="/registroMascota">
            <button className={stl.botonMapa3} type="submit" onClick={handleSubmit}>Confirmar y Volver</button>
            </Link>
            </div>

        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <FlyMapTo />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        <Marker position={position} icon={IconLocation}>
 
           <Popup>
               Esta es mi ubicacion
          </Popup>

    </Marker>

    <Markers />
        
    </MapContainer>
    
    <Footer />
    </div>
    )
}