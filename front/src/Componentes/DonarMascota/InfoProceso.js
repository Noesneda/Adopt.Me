import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import stl from "../DonarMascota/InfoProceso.module.css";
import FloatingUI from "../Floating UI/FloatingUI";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import getDetalleUsuario from "../../Actions/getDetalleUsuario";
import Toast from 'light-toast';


export default function InfoProceso() {
  const navigate = useNavigate()
  const params = useParams();
  const { user, isAuthenticated } = useAuth0()
  const dispatch = useDispatch();

  
  
  let id = undefined
  if (user) {
  const usuarioIdRaro = user.sub
  id = usuarioIdRaro.substring(6)
  }
  
  useEffect(() => {
          dispatch(getDetalleUsuario(id));
          window.scrollTo(0,0);
  }, [dispatch]);
  

  const detalleUser = useSelector((state) => state.detalleUsuario); // Estado global con los datos del usuario
  const detalleUserGoogle = useSelector((state) => state.detalleUsuarioGoogle)


  
  function onClick(e) {
    e.preventDefault()
    if (!user) {
      return Toast.fail("Debes iniciar sesion para poder poner en adopcion", 1500, () => {});
    }

    if (!detalleUser.usuario && detalleUserGoogle.length == 0) {
      return Toast.fail("Debes completar el registro en tu perfil antes de poner en adopcion", 1500, () => {});
    }
    if (user && detalleUser.usuario || detalleUserGoogle.usuario) { 
    navigate("/registroMascota")
    }
  }
  

  return (
    
    < div className = { stl.donarmascota } key = { params.id } >
      <NavBar />
      <FloatingUI />
      <div>
        <h1 className={stl.tituloDonarMascota}>
          PUBLICA LOS ANIMALES QUE TIENES EN ADOPCIÓN
        </h1>
      </div>

      <div>
        <h2 className={stl.h2s}>¿Sabes cómo funciona Adopt.ME?</h2>
        <h3 className={stl.h3s}>
          El objetivo de Adopt.Me es brindarte una herramienta de amplia
          difusión para que vos, como protector o protectora independiente,
          colectivo, fundación o asociación civil que resguardas temporalmente
          perros y gatos, los ofrezcas en adopción; la idea es enlazarte con el
          mayor número posible de personas que quieran adoptar. En Adopta.ME
          podes publicar información de todos los perros y gatos que tengas en
          adopción, no hay un límite de publicaciones. Empeza por regístrarte.
          Es muy sencillo, te mandaremos por correo electrónico tu usuario y
          contraseña para ingresar Adopta.ME y poder publicar la información de
          los perros y gatos que tengas en adopción. Podrás personalizar la
          información de los perros y gatos que tengas en adopción y que quieras
          mostrarle a nuestros seguidores y visitantes. Incluso podes comentar
          sobre sus habilidades o contarnos alguna historia breve sobre su vida.
          Recorda que también difundimos a través de todas nuestras redes
          sociales a los perros y gatos que están en Adopt.Me.
        </h3>
      </div>

      <div>
        <h2 className={stl.h2s}>Crea tu cuenta en Adopta.ME</h2>
        <h3 className={stl.h3s}>
          Registrate gratis. Una vez que completes el formulario vas a recibir
          un correo con tu usuario y contraseña y vas a poder comenzar a
          publicar tus mascotas.
        </h3>
        <Link to="/registroMascota">
          <button className={stl.botones2} onClick={(e) => onClick(e)}>
            REGISTRAR MASCOTA
          </button>
        </Link>
      </div>

      <div>
        <h2 className={stl.h2s}>Requisitos para publicar en Adopt.ME:</h2>
        <h3 className={stl.h3s}>
          Prepará tus datos y la información y las fotos de tu/s mascota/s para
          su registro. Es importante que tus perros y gatos estén vacunados,
          desparasitados y esterilizados. Si son cachorros de menos de 4 meses,
          deberás acordar formalmente su esterilización con la persona que los
          adopte. Recorda que, una vez que tus perros o gatos se adoptaron,
          debes cambiar su estatus de “en adopción” a “adoptado”. Es tu
          responsabilidad hacerlo a fin de darle certeza a quien visite
          Adopta.ME y pretenda adoptar.
        </h3>
      </div>

      <Link to="/homepage">
        <button className={stl.botones2}>VOLVER</button>
      </Link>

      <Footer />
    </div>
  );
}
