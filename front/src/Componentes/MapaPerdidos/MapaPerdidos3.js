import React, { useEffect, useState } from "react"
import {MapContainer, TileLayer, useMap} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import stl from "../MapaPerdidos/MapaPerdido.module.css";
import MarkersLostCats from "./MarcadoresCats";
import MarkersLostDogs from "./MarcadoresDogs";

export default function LostPetsList() {

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

const position = [geo.lat, geo.lng]

const local = position

function FlyMapTo() {

    const map = useMap()

    useEffect(() => {
        map.flyTo(position)
    }, [])

    return null
}

   

    return ( 

    <div className="map">

       <NavBar />

        <p>Estas son las mascotas perdidas reportadas</p>

        <div className={stl.iconos}>
        <div className={stl.gatos}></div>
        <div className={stl.titulogatosperros}>Gatos</div>
        <div className={stl.perros}></div>
        <div className={stl.titulogatosperros}>Perros</div>
        </div>

        <div className={stl.mapPerdidos}>
        <MapContainer center={local} zoom={13} scrollWheelZoom={false} >
        <FlyMapTo />
        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

         <MarkersLostCats  />
         <MarkersLostDogs />

            
        </MapContainer > 
        </div>

        <Link to ="/buscarmascota">
        <button className={stl.botonMapa}>Volver</button>
        </Link>

        <Footer />

    </div>
    )

}

//
  