import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import getDetalleUsuario from "../../Actions/getDetalleUsuario";
import getusers from "../../Actions/getusers";
import stl from "../PAdmCardDetalles/usuarioDetalle.module.css";


const UsuariosDetalles = () => {

   const dispatch = useDispatch();
   let { id } = useParams();
   const UserDetalles = useSelector((state) => state.detalleUsuario).data

   useEffect(() => {
    dispatch(getDetalleUsuario(id));//se monta el componente
   }, [dispatch, id]);



  return (
    <div className={stl.containDetail}>
        <div>{
           UserDetalles.length > 0 ? 
           <div>{/* div CONDICION:  tiene adentro la respuesta a la primer condicion. Tiene todo lo que deberia tener el detalle */}
             <div className={stl.containBtnTitle}>
             <Link to="/panel-Administrador/usuarios">
                 <button className={stl.btnHome}>Volver</button>
             </Link>
             <h1 className={stl.detailTitle}>INFORMACION DETALLADA DE NUESTROS USUARIOS</h1><br/>
             </div>
             <div className={stl.containImgInfo}>
               <div className={stl.containInfoDetail}>
                 <h2>{UserDetalles.nombre}</h2><br/>
                 <h3># {UserDetalles.usuario}</h3>
                 <h3># {UserDetalles._id}</h3>
               
               </div>
               </div>
              <br/>
              <br/>
              <br/>
              
              
           </div>/* div fin CONDICIKON: */
        : <div>No hay detalle de este usuario</div>
        }
        </div>
    </div>
  )
}

export default UsuariosDetalles;

/* import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import getmascotasbyid from "../../Actions/getmascotabyid";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import stl from "../AdoptarMascota/DetalleMascotas.module.css";
import FloatingUI from "../Floating UI/FloatingUI";
import getDetalleUsuario from "../../Actions/getDetalleUsuario";
import getusers from "../../Actions/getusers";



 function UsuarioDetalles(props) {
  
  const params = useParams();
  const dispatch = useDispatch();
 
  const navigate = useNavigate(); // Metodo de router que me redirige a la ruta que yo le diga
  const userDetalle = useSelector((state) => state.detalleUsuario)
  
  const id = props.datos._id;

  useEffect(() => {
    dispatch(getDetalleUsuario(id)); 
    dispatch(getusers());
  }, [dispatch, id]);

  const [input, setInput] = useState({
    usuario: props.datos.usuario,
    nombre: props.datos.nombre,
    telefono: props.datos.telefono,
    mail: props.datos.mail,
    nacimiento: props.datos.nacimiento,
    localidad: props.datos.localidad,
    fotoPerfil: props.datos.fotoPerfil,
  });
  


  return (
    <div className={stl.paginaAdopcion}> 
     <div>
    <Link to="/panel-Administrador/usuarios">
        <button>Volver</button>
    </Link>
    </div>
    <div>

    </div>

      <Footer />
    </div>
  );
}


export default UsuarioDetalles; */