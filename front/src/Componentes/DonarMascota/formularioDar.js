import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import createanimal from "../../Actions/createanimal";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer"
import stl from "../DonarMascota/formularioDar.module.css"
import FloatingUI from "../Floating UI/FloatingUI";
import imagenDefault from "../../Imagenes/imagenDefault.png"
import Toast from 'light-toast';
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Markers from "../Maps/Markers";
import createLocation from "../../Actions/createLocation";
import { IconLocation } from "../Maps/IconLocation";
import "../DonarMascota/formularioDar.css"
 
 export default function DarEnAdopcion() {



  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 
 const navigate = useNavigate();
 const dispatch = useDispatch();

 

 const usuario = useSelector((state) => state.detalleUsuario)
 const detalleUserGoogle = useSelector((state) => state.detalleUsuarioGoogle) 

  /////////////////////////////////////////////////////////// TOMA MI UBICACION ACTUAL SEGUN MI GPS ///////////////////

  const [geo, setGeo] = useState({
    lng: -61.043988,
    lat: -34.7361,
  })
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            setGeo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            })
        }, 
        function(error) {
            console.log(error)
        }, {
            enableHighAccuracy: true
        });
        window.scrollTo(0,0);
  }, [])

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 const [input, setInput] = useState({
        perro: false,
        gato: false,
        nombre: "",
        raza: "",
        edad: [],
        estado: "En adopción",
        tama: [],
        peso: "",
        descripcion: "",
        castrado: "",
        vacunado: "",
        desparasitado: "",
        imagen: "",
        pichina: "",
        lat: "",
        lng: "",
        adoptado: false
      });

  const [imagenes, setImagenes] = useState([]);
  // console.log(input.pichina)
  const [errors, setErrors] = useState({});
  // const [isSubmit, setisSubmit] = useState(false);
console.log("input 1", input)
  
  ////////////////////////////////////////////////////// VALIDACION ///////////////////////////////////////////////////////////////

  function validation(input) {
    let errors = {};

    if (!input.nombre) {
      errors.nombre = "Tenes que ingresar un nombre";
    } else if (!/^[a-z\s]+$/i.test(input.nombre)) {
      errors.nombre = "El nombre no es válido";
    }

    if (!input.raza) {
      errors.raza = "Tenes que ingresar una raza";
    } else if (!/^[a-z\s]+$/i.test(input.nombre)) {
      errors.raza = "La raza no es válida";
    }

    if(!input.edad || input.edad === []) {
      errors.edad = "Tenes que indicar la edad"
    }

    if(!input.tama || input.tama === []) {
      errors.tama = "Tenes que indicar el tamaño"
    }

    if (!input.peso) {
      errors.peso = "Tenes que ingresar el peso";
    } else if (input.peso > 110) {
      errors.peso = "El peso no es valido";
    }

    if(!input.descripcion) {
      errors.descripcion = "Tenes que ingresar una descripción";
    } else if (input.descripcion.length > 800) {
      errors.descripcion = "La descripción es muy larga (Max = 800 caracteres)";
    }

    if(!input.castrado) {
      errors.castrado = "Tenes que ingresar una respuesta";
    } else if (
      input.castrado !== "si" && 
      input.castrado !== "SI" && 
      input.castrado !== "Si" &&
      input.castrado !== "sI" && 
      input.castrado !== "no" &&
      input.castrado !== "NO" &&
      input.castrado !== "No" &&
      input.castrado !== "nO"
      ) {
      errors.castrado = "Tenes que ingresar si o no";
    }

    if(!input.vacunado) {
      errors.vacunado = "Tenes que ingresar una respuesta";
    } else if (
      input.vacunado !== "si" && 
      input.vacunado !== "SI" && 
      input.vacunado !== "Si" &&
      input.vacunado !== "sI" && 
      input.vacunado !== "no" &&
      input.vacunado !== "NO" &&
      input.vacunado !== "No" &&
      input.vacunado !== "nO"
      ) {
      errors.vacunado = "Tenes que ingresar si o no";
    }

    if(!input.desparasitado) {
      errors.desparasitado = "Tenes que ingresar una respuesta";
    } else if (
      input.desparasitado !== "si" && 
      input.desparasitado !== "SI" && 
      input.desparasitado !== "Si" &&
      input.desparasitado !== "sI" && 
      input.desparasitado !== "no" &&
      input.desparasitado !== "NO" &&
      input.desparasitado !== "No" &&
      input.desparasitado !== "nO"
      ) {
      errors.desparasitado = "Tenes que ingresar si o no";
    }

    // if (Object.keys(errors).length === 0) {
    //   setisSubmit(true);
    // }

    return errors;
  }

  
  /////////////////////////// SUBMIT /////////////////////////////////////////////////////////////////////
  function handleSubmit(e){
    e.preventDefault();

    //Si no hay errores, el isSubmit esta en true
    // if (isSubmit === true) {
    
      dispatch(createLocation(input));
      dispatch(createanimal(input));
      

      setInput({
        perro: false,
        gato: false,
        nombre: "",
        raza: "",
        edad: [],
        estado: "En adopción",
        tama: [],
        peso: "",
        descripcion: "",
        castrado: "",
        vacunado: "",
        desparasitado: "",
        imagen: "",
        pichina: detalleUserGoogle.usuario ? detalleUserGoogle._id : usuario._id,
        lat: "",
        lng: "",
        adoptado: false
      });
      
      Toast.success("Mascota publicada correctamente", 1500, () => {
        navigate("/homepage")
      });
    // } else {
      // alert("No se pudo completar el registro, revise los campos");
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
  e.preventDefault();
  setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })); // e.target.name seria el input que se va a estar modificando
  setErrors(
    validation({
      // voy a tomar el valor del input que se modifico y voy a ir llenando el estado
      ...input,
      [e.target.name]: [e.target.value],
    })
  );
}

  function handleEdad(e) {
    if (input.edad.length === 0)
      setInput({
        ...input,
        edad: [...input.edad, e.target.value]
      })
   } 

   function handleTamaño(e) {
    if (input.tama.length === 0)
    setInput({
      ...input,
      tama: [...input.tama, e.target.value]
    })
 } 

  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  ///////////////////////////////////////////////////// GUARDA LA UBICACION EN LA BASE DE DATOS //////////////////////

function handleLocation() {
  setInput({
    ...input,
          lat: geo.lat,
          lng: geo.lng
  })
  Toast.success("Ubicacion Establecida. Por favor seleccione 'Guardar mi Ubicacion'", 1000, () => {});
}

function handleLocation2() {
  setInput({
    ...input,
          lat: geo.lat,
          lng: geo.lng
  })
  Toast.success("Ubicacion Guardada con exito", 1000, () => {});
}
  
 /////////////////////// HANDLE DE GATO ////////////////////////////////////77
 
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
      [e.target.name]: false
     })
  }}

  ///////////////////////////// HANDLE DE PERRO ///////////////////////////////////////////7

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


  ///////////////////////////// HANDLE DE CLOUDINARY  ///////////////////////////////////7

  function handleOpenWidget(e) {
    // console.log("Entre el handleOpenWidget");
    e.preventDefault();
    const imagen = document.querySelector("#default-photo");
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


/////////////////////////////////////////////////////////// GUARDANDO DATOS EN LOCALSTORAGE  ///////////////////////////////////////////////////

  const { nombre, raza, peso, descripcion, castrado, vacunado, desparasitado } = input;

  const handleLocalStorage = (e) => {
   let value = e.target.value;
   let name = e.target.name;

   setInput((prev) => ({...prev, [name]: value}))
};

 useEffect(() => {
   const nameS = JSON.parse(localStorage.getItem("nom"));
   if (nombre === "" && raza === "" && peso === "" && descripcion === "" && castrado === "" && vacunado === "" 
        && desparasitado === "") {
     setInput((prev) => ({ ...prev, ...nameS}))
   }
 }, [])

 useEffect(() => {
   localStorage.setItem("nom", JSON.stringify(input))
 }, )

 ////////////////////////////////////////////// EDAD Y TAMAÑO LOCALSTORE /////////////////////////////////////////////////

 const { edad, tama } = input;

 const handleLocalTamEdad = (e) => {
  let value = e.target.value;
  let name = e.target.name;

  setInput((prev) => ({...prev, [name]: value}))
 };

 useEffect(() => {
  const optionS = JSON.parse(localStorage.getItem("edadTamaño"));
  
  if (edad === null && tama === null) {
    setInput((prev) => ({...prev, ...optionS}))

  }
 }, [])

 useEffect(() => {
  localStorage.setItem("edadTamaño", JSON.stringify(input))
 }, )


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

/////////////////////////////////////////////////////  MARCADOR MOVIBLE /////////////////////////////////////////////////////7

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

///////////////////////////////////////////////////////////////////////  TE KAVIO EL RETURN  ///////////////////////////
  return (
    
  <div className={stl.formDarAdopcion}>
    <NavBar />
    <FloatingUI />
  

          <div className={stl.titulo}>REGISTRA LOS DATOS DE LA MASCOTA</div>
          
          <form className={stl.formularito} onSubmit={handleSubmit} >

          <div className={stl.imageContainer}>

          <div >
            <img
              src={imagenDefault}
              id="default-photo"
              alt=""
              height="150"
              width="150"
            />

            <button
              id="btn-foto"
              name="imagen"
              onClick={(e) => handleOpenWidget(e)}
              className={stl.botonFoto}
            >
              AGREGAR FOTO
            </button>
            <span></span>
            </div>
            </div>

             {/*<div className={stl.imagePreview}>
                <img src= {imagenes.url} value={imagenes.id} alt="foto"/>
                {imagenes.map((f) => (
                  <i className="fa fa-times close-icon" onClick={() => handleDelete(f)} value={f.id}></i>
                ))}
                </div>
                
                <div className={stl.imagePreview}> 
                  
                  </div>
                  <div>
                    <button
                    className={stl.botonFoto}
                    name="fotos"
                    onClick={handleOpenWidget}> 
                      AGREGAR FOTOS
                      </button>
             
                      </div>  */}
                  
       <div className={stl.contenedordatos}>
       <div className={stl.gatoPerro}>
         <div className={stl.opciones2}>
                <label className={stl.titulos2}>Gato:</label>
                <input className={stl.inputs2} onChange={ (e) => { handleCheck(e); handleGato(e); }}
                type="checkbox" name="gato" checked={isChecked} value={input.gato}/>                       
            </div> 
          
            <div className={stl.opciones2}>
                <label className={stl.titulos2}>Perro:</label>
                <input className={stl.inputs2} onChange={ (e) => { handleCheck2(e); handlePerro(e); }}
                type="checkbox" name="perro" checked={isChecked2} value={input.perro}/>                        
            </div>
            </div>                     
                   
                <label className={stl.titulos}>Nombre:</label>
              <div className={stl.opciones}>
                <input onChange={ (e) => {handleChange(e); handleLocalStorage(e); }}
                type="text" name="nombre" value={input.nombre}/>  
                {errors.nombre && <p className={stl.error}>{errors.nombre}</p>}                      
            </div>
 
            <label className={stl.titulos}>Raza:</label>
            <div className={stl.opciones}>
                <input onChange={handleChange} 
                type="text" name="raza" value={input.raza}/> 
                {errors.raza && <p className={stl.error}>{errors.raza}</p>}          
            </div>

            <label className={stl.titulos}>Edad:</label>
            <div className={stl.opciones}>                                
            <select className={stl.edad} name="edad" defaultValue="" onChange={(e) => {handleEdad(e); handleLocalTamEdad(e); }}>
                       <option value="" disabled hidden>Selecciona edad...</option>
                       <option>Menos de 45 dias</option>
                       <option>Mas de 45 dias</option>
                       <option>Adulto</option>
                       <option>Anciano</option>
                        </select>
                        {errors.edad && ( <p className={stl.error}>{errors.edad}</p>)}
                        </div>

            <label className={stl.titulos}>Tamaño:</label>
            <div className={stl.opciones}>                                     
            <select className={stl.tamaño} name="tama" defaultValue="" onChange={(e) => {handleTamaño(e); handleLocalTamEdad(e); }}>
                       <option value="" disabled hidden >Seleccione tamaño...</option>
                       <option>Chico</option>
                       <option>Mediano</option>
                       <option>Grande</option>
                       </select>
                       {errors.tama && <p className={stl.error}>{errors.tama}</p>}
                       </div>
        
            <label className={stl.titulos}>Peso (en Kg):</label>
            <div className={stl.opciones}>
                <input onChange={handleChange} 
                type="text" name="peso" value={input.peso}/>
                {errors.peso && <p className={stl.error}>{errors.peso}</p>}          
            </div>

           <div >
            <p className={stl.mapaInfo}>Por favor. Para guardar su ubicacion exitosamente<br></br>
            <br></br>1. Primero haga click sobre el marcador azul y muevalo hasta donde se encuentra la mascota
        <br></br>2. Despues seleccione "Establecer mi Ubicacion"<br></br>3. Luego "Guardar mi Ubicacion".</p>
        
        <div className={stl.botones}>
        <button className={stl.botonMapa2} onClick={handleLocation}>Establecer mi Ubicacion</button>
        <button className={stl.botonMapa2} onClick={handleLocation2}>Guardar mi Ubicacion</button>
             </div>

        <div className={stl.contenedorMapa}>

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

                <Markers />
        
        </MapContainer>
    
    </div>
            </div> 

            <label className={stl.titulos}>Descripción:</label>
            <div className={stl.opciones}>
            <textarea
            className={stl.textareaDonar}
              required
              type="text"
              name="descripcion"
              resize="none"
              value={input.descripcion}
              onChange={(e) => handleChange(e)}
              > </textarea>
              {errors.descripcion && <p className={stl.error}>{errors.descripcion}</p>}
          </div>

          <br></br>
          
            <div className={stl.opciones}>
            <label className={stl.titulos}>Esta Castrado? (Si/No):</label>
                <input className={stl.inputs3} onChange={handleChange}type="text" name="castrado" value={input.castrado}/>
                {errors.castrado && <p className={stl.error}>{errors.castrado}</p>}
            </div> 

            <br></br>

            <div className={stl.opciones}>
            <label className={stl.titulos}>Esta Vacunado? (Si/No):</label>
                <input className={stl.inputs3} onChange={handleChange} type="text" name="vacunado"  value={input.vacunado}/>
                {errors.vacunado && <p className={stl.error}>{errors.vacunado}</p>}
            </div>  

            <br></br>

            <div className={stl.opciones}>
            <label className={stl.titulos}>Esta desparasitado? (Si/No):</label>
                <input className={stl.inputs3} onChange={handleChange} type="text" name="desparasitado"  value={input.desparasitado}/>
                {errors.vacunado && <p className={stl.error}>{errors.vacunado}</p>}
            </div>  
            </div>
            
              <div>
            <button
              className={stl.boton}
              type="submit"
              onClick={handleImagen }
              // disabled={isSubmit ? false : true}
            >
              PONER EN ADOPCIÓN
            </button>

            <Link to="/homepage">
              <button className={stl.boton}>CANCELAR</button>
            </Link>
          </div>
          
        </form>
        <Footer />
    </div>
  )}