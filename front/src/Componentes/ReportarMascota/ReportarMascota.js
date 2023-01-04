import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import createAnimalPerdido from '../../Actions/createAnimalPerdido';
import './ReportarMascota.module.css'
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer"
import stl from "../ReportarMascota/ReportarMascota.module.css"
import FloatingUI from "../Floating UI/FloatingUI";
import imagenDefault from "../../Imagenes/imagenDefault.png"
import Toast from 'light-toast';
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MarkersLost from "../MapaPerdidos/Marcadores";
import createLocationPerdidos from "../../Actions/createLocationPerdidos";
import { IconLocation } from "../Maps/IconLocation";


////////////////////////////////////////////////////// VALIDACION ///////////////////////////////////////////////////////////////

function validation(input){
    let errors = {};
    const whitespace = /\S+/;
    const validString = /^[a-z]+$/i;
    const validNumber = /^\d+$/;
 
  
   if (
     !whitespace.test(input.nombre) ||                
     !validString.test(input.nombre) ||               
     input.nombre.length < 3                          
    ) errors.nombre = "Nombre Requerido. Debe contener mas de dos caracteres y no incluir ningun simbolo o caracter especial";
                                                
                                        
   if ( 
       !validNumber.test(input.edad) ||      
       parseInt(input.edad) < 1      ||      
       parseInt(input.edad) > 20            
     ) errors.edad = "Edad is required. Must be higher than 1 and less than 20.";
                                   
                                    
     if (!input.descripcion) {
       errors.descripcion = "Tienes que agregar una descripcion informativa de la mascota";
     } else if (!/^[a-z\s]+$/i.test(input.descrpcion)) {
       errors.descripcion = "La descripcion no es válida";
     }
                                
     return errors
 }

 //////////////////////////////////////////////////// PA ADOPTAR AMEGO ////////////////////////////////////////////////////////////
 
 export default function ReportarMascotaPerdida() {
 
 
 const navigate = useNavigate();
 const dispatch = useDispatch();

 useEffect(() => {
   window.scrollTo(0,0);
 }, [])
  

 const [input, setInput] = useState({
        perro: false,
        gato: false,        
        estado: [],
        tama: [],
        peso: "",
        descripcion: "",        
        imagen: "",
        lng: "",
        lat: "",
        adoptado: false
      });
  const [imagenes, setImagenes] = useState([]);
      
  const [errors, setErrors] = useState({});

    function handleSubmit(e){
         e.preventDefault();

    dispatch(createLocationPerdidos(input))
    dispatch(createAnimalPerdido(input, imagenes));

    setInput({
      perro: false,
      gato: false,        
      estado: [],
      tama: [],
      peso: "",
      descripcion: "",        
      imagen: "",
      lng: "",
      lat: "",
      adoptado: false
    })
  
    // setImagenes([])
    Toast.success("Mascota agregada", 1500, () => {
      navigate("/homepage")
    });
 }

 /////////////////////////// EXTRAYENDO URL DE CLAUDINARY /////////////////////////////////////////////////////////////////////

 const img = []
 for (let i = 0; i < imagenes.length; i++) {
    img.push(imagenes[i])
 }

 let imgUrl = img.map(({ url }) => url)

 let urlImagen = imgUrl.toString();

  function handleImagen() {
    setInput({
      ...input,
      imagen: urlImagen
    })
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7

 function handleChange(e) {

    setInput({
       ...input,
       [e.target.name]: e.target.value
    })

    setErrors(
        validation({
            ...input,
            status: e.target.value,
        })
    )
  }


   function handleTamaño(e) {
    if (input.tama.length === 0)
    setInput({
      ...input,
      tama: [...input.tama, e.target.value]
    })
 } 
 function handleEstado(e) {
  if (input.estado.length === 0)
  setInput({
    ...input,
    estado: [...input.estado, e.target.value]
  })
} 

  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  
 /////////////////////// HANDLE DE GATO
 
  function handleCheck() {  
    setIsChecked(!isChecked)
    } 

    function handleGato(e) {
      if(e.target.checked === !isChecked) { 
        setInput({
          ...input,
          [e.target.name]: e.target.checked
       })
  } else {
      setInput({
      ...input,
      [e.target.value]: false
     })
  }}

  ///////////////////////////// HANDLE DE PERRO

    function handleCheck2() {     
        setIsChecked2(!isChecked2)
      }

      function handlePerro(e) {
        if(e.target.checked === !isChecked2) { 
        setInput({
         ...input,
        [e.target.name]: e.target.checked
       })
    } else {
        setInput({
        ...input,
        [e.target.value]: false
       })
    }}


  ///////////////////////////// HANDLE DE CLOUDINARY

    function handleOpenWidget(e) {
      // console.log("Entre el handleOpenWidget");
      e.preventDefault();
      const imagen = document.querySelector("#mascota-photo");
      var myWidget = window.cloudinary.createUploadWidget(
          {
              cloudName: "dvw0vrnxp",
              uploadPreset: "mascotas",
          },
          (error, result) => {
              if (!error && result && result.event === "success") {
              //console.log('Done! Here is the image info: ', result.info);
              imagen.src = result.info.secure_url;

              setImagenes((prev) => [
                ...prev, {
                  url: result.info.secure_url, 
                  id: result.info.public_id
                }])
              }
            }
          );
          
      myWidget.open();
      }

  ///////////////////////////// HANDLE DELETE FOTO

  // function handleDelete(f) {
  //   setImagenes({
  //     ...imagenes,
  //     id: imagenes.id.filter((id) => id !== f)
  //   });
  // }

/////////////////////////////////////////////////////////// TE KAVIO EL RETURN  ///////////////////////////////////////////////////

const {descripcion } = input;

  const handleDesc = (e) => {
   let value = e.target.value;
   let name = e.target.name;

   setInput((prev) => ({...prev, [name]: value}))
};

 useEffect(() => {
   const descS = JSON.parse(localStorage.getItem("desc"));
   if (descripcion === "") {
     setInput((prev) => ({ ...prev, ...descS}))
   }
 }, [])

 useEffect(() => {
   localStorage.setItem("desc", JSON.stringify(input))
 }, )

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 const { estado, tama } = input;

 const handleEstadoTama = (e) => {
  let value = e.target.value;
  let name = e.target.name;

  setInput((prev) => ({...prev, [name]: value}))
 };

 useEffect(() => {
  const estadoS = JSON.parse(localStorage.getItem("estadoTamaño"));
  console.log("estadoS", estadoS)
  if (estado === null && tama === null) {
    setInput((prev) => ({...prev, ...estadoS}))

  }
 }, [])

 useEffect(() => {
  localStorage.setItem("estadoTamaño", JSON.stringify(input))
 }, )

 ////////////////////////////////////////////////////////////////////////////////////////////////////

 
function handleLocation(e) {
  e.preventDefault()
  setInput({
    ...input,
          lat: geo.lat,
          lng: geo.lng
  })
  Toast.success("Ubicacion Establecida. Por favor seleccione 'Guardar mi Ubicacion'", 1500, () => {});
}

function handleLocation2(e) {
  e.preventDefault()
  setInput({
    ...input,
          lat: geo.lat,
          lng: geo.lng
  })
  Toast.success("Ubicacion Guardada con exito. Por favor seleccione 'Confirmar y volver'", 1500, () => {});
}

//////////////////////////////////////////////////////////////////////////////////////////////

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


            const [draggable, setDraggable] = useState(false)
            const markerRef = useRef(null)
            const eventHandlers = useMemo(
            () => ({
              dragend() {
                const marker = markerRef.current
                if (marker != null) {
                  setGeo(marker.getLatLng())
                }
              },
            }),
            [],
            )
            const toggleDraggable = useCallback(() => {
            setDraggable((d) => !d)
            }, [])

            const position = [geo.lat, geo.lng]

            const local = position

            function FlyMapTo() {

            const map = useMap()

            useEffect(() => {
                map.flyTo(local)
                
            }, {enableHighAccuracy: true})

            return null
            }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    
  <div className={stl.paginareportar}>
    <NavBar />
    <FloatingUI />
          
          <div className={stl.tituloperdido}>Registra los datos de Mascota Perdida</div>
   
        <form className={stl.formul} onSubmit={handleSubmit}>

      {errors.gato && ( <p class="error2">{errors.gato}</p>)} 
      {errors.perro && ( <p class="error2">{errors.perro}</p>)}
      {errors.descripcion && ( <p class="error2">{errors.descripcion}</p>)} 
      

          
      <div className={stl.imageContainer2}>

        <div >
            <img
        src={imagenDefault}
          id="mascota-photo"
          alt=""
          height="150"
          width="150"
          />

        <button
            id="btn-foto"
         name="imagen"
         onClick={(e) => handleOpenWidget(e)}
         className={stl.botonFoto2}
          >
            AGREGAR FOTO
            </button>
          <span></span>
            </div>
            </div>
                  
            <div className={stl.contenedordatos2}>
       <div className={stl.gatoPerro2}>
         <div className={stl.opciones2}>
                <label className={stl.titulos2}>Gato:</label>
                <input className={stl.inputs2} onChange={ (e) => { handleCheck(e); handleGato(e); }}
                type="checkbox" name="gato" checked={isChecked} value={input.gato}/>                       
            </div> 
          
            <div className={stl.opciones2}>
                <label className={stl.titulos2}>Perro:</label>
                <input className={stl.inputs2} defaultValue="" onChange={ (e) => { handleCheck2(e); handlePerro(e); }}
                type="checkbox" name="perro" checked={isChecked2} value={input.perro}/>                        
            </div>
            </div>

            <div className={stl.opciones}>                                     
            <label className={stl.titulos}>Estado:</label>
            <select className={stl.tamaño} defaultValue="" onChange={(e) => {handleEstado(e); handleEstadoTama(e); }}>
                      <option value="" disabled hidden>Selecciona estado...</option>
                       <option>Perdido</option>
                       <option>Encontrado</option>                       
                       </select>
                        </div>

            <div className={stl.opciones}>                                     
            <label className={stl.titulos}>Tamaño:</label>
            <select className={stl.tamaño} defaultValue="" onChange={(e) => {handleTamaño(e); handleEstadoTama(e); }}>
            <option value="" disabled hidden>Selecciona tamaño...</option>
                       <option>Chico</option>
                       <option>Mediano</option>
                       <option>Grande</option>
                       </select>
                        </div>
        

            <div className={stl.opcionesMapa}>
            
        <p className={stl.ps}>Por favor. Para guardar su ubicacion exitosamente<br></br>
        Primero haga click en el marcador para moverlo  <br></br>a la posicion
         donde perdio 
        su mascota o vio una mascota perdida. <br></br><br></br>Despues seleccione "Establecer mi Ubicacion", 
        y luego "Guardar mi Ubicacion".</p>
      
        <div className={stl.botones}>
        <button className={stl.botonubicacion} onClick={handleLocation}>Establecer mi Ubicacion</button>
        <button className={stl.botonubicacion} onClick={handleLocation2}>Guardar mi Ubicacion</button>
        {/* <Link to ="/reportarmascota">
            <button className={stl.botonMapa3} type="submit" onClick={handleSubmit} >Confirmar y Volver</button>
            </Link> */}
            </div>

        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <FlyMapTo />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={geo}
        ref={markerRef}
        icon={IconLocation}>
        <Popup minWidth={90}>
          <div onClick={toggleDraggable}>
            {draggable
              ? 'Ya puedes arrastrarlo'
              : 'Hace "Click" aqui para arrastrarlo'}
          </div>
        </Popup>
      </Marker>
        
    </MapContainer>

            </div>

            <div className={stl.opciones}>
            <label className={stl.titulos}>Descripcion:</label>
                <textarea className={stl.textareaRepor} onChange={(e) => {handleChange(e); handleDesc(e); }} type="textarea" name="descripcion" value={input.descripcion}/>
               
           </div>
            <div className={stl.contacto}>( Por favor deja algun dato de contacto en la descripcion para <br></br>que puedan comunicarse contigo en caso de alguien la encuentre )</div>
          </div>

            <button className={stl.botonperdido} onClick={handleImagen}>Reportar</button>
             {/* <button className={stl.boton} type="submit">Dar en Adopcion</button> */}

        </form>
        <Footer />
    </div>
  
  )}

  //