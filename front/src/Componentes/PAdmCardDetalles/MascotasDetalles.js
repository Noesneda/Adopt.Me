import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import getmascotasbyid from "../../Actions/getmascotabyid";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import stl from "../AdoptarMascota/DetalleMascotas.module.css";
import FloatingUI from "../Floating UI/FloatingUI";
import getDetalleUsuario from "../../Actions/getDetalleUsuario";
import { useAuth0 } from "@auth0/auth0-react";
import Toast from "light-toast";
import getusers from "../../Actions/getusers";
// import emailInfoAdoptante from "../../Actions/emailInfoAdoptante"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { IconLocation } from "../Maps/IconLocation";
import getDetalleUsuarioGoogle from "../../Actions/getDetalleUsuarioGoogle";

 function MascotasDetalles() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.animalesdetail);
  const petOwner = useSelector((state) => state.users);
  const detalleUser = useSelector((state) => state.detalleUsuario);
  const detalleUserGoogle = useSelector((state) => state.detalleUsuarioGoogle);
  const { user, isAuthenticated } = useAuth0();

  //////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    dispatch(getmascotasbyid(id));
    dispatch(getusers());
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  let usuarioIdRaro = "";
  let _id = "";
  if (isAuthenticated) {
    if (user.sub.startsWith("google")) {
      usuarioIdRaro = user.sub;
      _id = usuarioIdRaro.substring(14);
    } else {
      usuarioIdRaro = user.sub;
      _id = usuarioIdRaro.substring(6);
    }
  }

  useEffect(() => {
    dispatch(getDetalleUsuarioGoogle(_id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getDetalleUsuario(_id));
  }, [id, dispatch]);

  // Usuario va a tener los datos del usuario logueado, sin importar si esta logueado con google o normal
  let usuario = detalleUserGoogle.usuario ? detalleUserGoogle : detalleUser;

  console.log("Estos son los detalles del usaurio");
  console.log(usuario);



  
  ///////////////////////////////////////////////////////////////////////////////////////

  function onClick(e) {
    e.preventDefault();
    if (!user) {
      return Toast.fail(
        "Debes iniciar sesion para poder adoptar",
        1500,
        () => {}
      );
    }

    if (!detalleUser.usuario && detalleUserGoogle.length === 0) {
      return Toast.fail(
        "Debes completar el registro en tu perfil antes de adoptar",
        1500,
        () => {}
      );
    }
    if ((user && detalleUser.usuario) || detalleUserGoogle.usuario) {
      return Toast.info(
        `Esta es la informacion del usuario que dio en adopcion esta mascota: \n
      Se enviara un mail con estos datos a tu correo electronico \n 
      Nombre: ${nombre} \n 
      Telefono: ${telefono} \n 
      Email: ${mail}`,
        10000,
        () => {
          navigate("/homepage");
        }
      );
    }
  }

  //////////////////////////////// DATOS DEL USUARIO QUE DIO EN ADOPCION ESTA MASCOTA //////////////////////////////

  const ownerPet = petOwner.data;
  const ownerPet2 = ownerPet
    ? ownerPet.filter(({ _id }) => _id === detail.pichina)
    : [];

  const nombre = ownerPet2.map(({ nombre }) => nombre);
  const telefono = ownerPet2.map(({ telefono }) => telefono);
  const mail = ownerPet2.map(({ mail }) => mail);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [geo, setGeo] = useState({
    lng: -61.043988,
    lat: -34.7361,
  });

  const position = [geo.lat, geo.lng];

  const local = position;

  function FlyMapTo() {
    const map = useMap();

    useEffect(
      () => {
        map.flyTo(local);
      },
      { enableHighAccuracy: true }
    );

    return null;
  }

  function handleLocation() {
    setGeo({
      lat: detail.lat,
      lng: detail.lng,
    });

    Toast.success(
      "Reubicandose a la ubicacion de esta mascota",
      1500,
      () => {}
    );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className={stl.paginaAdopcion}>
      <NavBar />
      <FloatingUI />
      <img className={stl.img} src={detail.imagen} alt="" />
      <div className={stl.cardDetalles}>
        <div className={stl.datosAdopcion}>
          <div className={stl.tituloAdopcion}>Datos de la Mascota</div>
          <div className={stl.datos2}>
            <div className={stl.titulos2}>
              Nombre: <p className={stl.details}>{detail.nombre}</p>
            </div>
            <div className={stl.titulos2}>
              Raza: <p className={stl.details}>{detail.raza}</p>
            </div>
            <div className={stl.titulos2}>
              Edad: <p className={stl.details}>{detail.edad}</p>
            </div>
            <div className={stl.titulos2}>
              Estado: <p className={stl.details}>{detail.estado}</p>
            </div>
            <div className={stl.titulos2}>
              Tamaño: <p className={stl.details}>{detail.tama}</p>
            </div>
            <div className={stl.titulos2}>
              Peso: <p className={stl.details}>{detail.peso}</p>
            </div>
            <div className={stl.titulos2}>
              Descripcion: <p className={stl.details}>{detail.descripcion}</p>
            </div>
            <div className={stl.titulos2}>
              Castrado: <p className={stl.details}>{detail.castrado}</p>
            </div>
            <div className={stl.titulos2}>
              Vacunado: <p className={stl.details}>{detail.vacunado}</p>
            </div>
          </div>

          <div className={stl.ubicacionMascota}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
              <FlyMapTo />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              return (
              <Marker position={[geo.lat, geo.lng]} icon={IconLocation}>
                <Popup>
                  <img
                    className={stl.imagenMarcador}
                    src={detail.imagen}
                    alt=""
                  />
                  <br></br>
                  Esta es la ubicacion<br></br> de esta mascota
                </Popup>
              </Marker>
              )
            </MapContainer>
            <button onClick={handleLocation} className={stl.verUbicacion}>
              Ver ubicacion de esta mascota
            </button>
          </div>

          {/* <Link to="/contacto">
            <button
              className={stl.botonDarAdopcion}
              onClick={(e) => onClick(e)}
            >
              ADOPTAR
            </button>
          </Link> */}
        </div>
      </div>

      <Footer />
    </div>
  );
}


export default MascotasDetalles;