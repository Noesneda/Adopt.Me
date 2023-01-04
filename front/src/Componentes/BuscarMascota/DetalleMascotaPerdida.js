import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import stl from "../BuscarMascota/DetalleMascotaPerdida.module.css";
import FloatingUI from "../Floating UI/FloatingUI";
import getDetailMascotaPerdida from "../../Actions/detailMascotaPerdida";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Toast from "light-toast";
import { IconLocation } from "../Maps/IconLocation";
import axios from "axios";
import Loading from "../Loader/Loader";


export default function DetallePerro () {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const detail = useSelector((state) => state.animalesPerdidosDetail);
    


    useEffect(() => {
        dispatch(getDetailMascotaPerdida(id))  
        window.scrollTo(0,0);             
    }, [id, dispatch])
   
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   const [geo, setGeo] = useState({
    lng: -61.043988,
    lat: -34.7361,
 })

const position = [geo.lat, geo.lng]

 const local = position

 function FlyMapTo() {

   const map = useMap()

   useEffect(() => {
       map.flyTo(local)
       
   }, {enableHighAccuracy: true})

   return null
}

function handleLocation() {
 setGeo({
       lat: detail.lat,
       lng: detail.lng
 })

 Toast.success("Reubicandose a la ubicacion de esta mascota", 1500, () => {});
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const [adopt, setAdopt] = useState({
  adoptado: false,
})
console.log("adopt", adopt)

useEffect(() => {
  setAdopt({
    adoptado: true,
  })
}, [])

function handleUpdate() {
  setAdopt({
      adoptado: true,
  })
}  

function handleAdoptado() {
  setAdopt({
      adoptado: true,
  })
  axios.put("animalesPerdidos/" + id, adopt)
   .then((res) => {
  console.log("res", res.data)
}).catch((error) => {
  console.log(error)
})
Toast.success("Gracias por informar que la mascota ya fue encontrada", 1500, () => {});
navigate("/homepage")
}

if (detail.length === 0) {
  return (
      <>
      <Loading />
      </>
  )
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
if (detail.adoptado === false) {
    return (

        <div className={stl.paginaAdopcion}>
            
            <NavBar />
            <FloatingUI />
              <img className={stl.img} src={detail.imagen} alt=""></img>
              <div className={stl.cardDetalles}>      

                  <div className={stl.datosAdopcion}>

                      <div className={stl.tituloAdopcion}>Datos de la Mascota</div>
                      <div className={stl.datos2}>  
            
                          <div className={stl.titulos2}>Tamaño: <p className={stl.details}>{detail.tama}</p></div>                 
                          <div className={stl.titulos2}>Estado: <p className={stl.details}>{detail.estado}</p></div>             
                          <div className={stl.titulos2}>Descripcion: <div className={stl.details2}>{detail.descripcion}</div></div>
           
                      </div>        
                  </div>

                  <div className={stl.ubicacionMascota}>

     
                        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                            <FlyMapTo />
                            <TileLayer
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                            

                                return (

                              <Marker
                              position={[geo.lat, geo.lng]} 
                              icon={IconLocation}> 
                              <Popup>
                                <img className={stl.imagenMarcador}src={detail.imagen} alt="" /><br></br>
                                Esta es la ubicacion<br></br> de esta mascota
                              </Popup>
                              </Marker>
                                )
                            
                        </MapContainer>
                        <button onClick={handleLocation} className={stl.verUbicacion}>Ver ubicacion de esta mascota</button>
                                
                  <div className={stl.encontre}>En el caso de que ya encontraste tu mascota perdida<br></br>Dale click al boton "Encontre mi mascota"</div>
                   <div className={stl.encontreMascota} onClick={(e) => {handleUpdate(e); handleAdoptado(e) }}>Encontre mi mascota</div>
                        </div>


             </div>

        <Footer />

        </div>

    );
      } else {
        return (

          <div className={stl.paginaAdopcion}>
              
              <NavBar />
              <FloatingUI />
                <img className={stl.img} src={detail.imagen} alt=""></img>
                <div className={stl.cardDetalles2}>      
  
                    <div className={stl.datosAdopcion}>
  
                        <div className={stl.tituloAdopcion}>Datos de la Mascota</div>
                        <div className={stl.datos2}>  
  
                             
                            {/* <div className={stl.titulos2}>Tamaño: <p className={stl.details}>{detail.tama}</p></div>                  */}
                    <div className={stl.encontradoaviso}>ESTA MASCOTA YA FUE ENCONTRADA</div>
                            
             
                        </div>        
                    </div>
  
                    {/* <div className={stl.ubicacionMascota}>
  
       
                          <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                              <FlyMapTo />
                              <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
  
                              
  
                                  return (
  
                                <Marker
                                position={[geo.lat, geo.lng]} 
                                icon={IconLocation}> 
                                <Popup>
                                  <img className={stl.imagenMarcador}src={detail.imagen} alt="" /><br></br>
                                  Esta es la ubicacion<br></br> de esta mascota
                                </Popup>
                                </Marker>
                                  )
                              
                          </MapContainer>
                          <button onClick={handleLocation} className={stl.verUbicacion}>Ver ubicacion de esta mascota</button>
                                  
  
                          </div> */}
                      
  
               </div>
  
          <Footer />
  
          </div>
  
      );
      }
};