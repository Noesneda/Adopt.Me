import React, { useState } from "react";
import stl from "../NavBar/NavBar.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";


export default function NavBar() {
  const [darkTheme] = useState(false);
  const { isAuthenticated } = useAuth0();
  const { logout } = useAuth0();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const navigate = useNavigate()

  const detalleUserGoogle = useSelector((state) => state.detalleUsuarioGoogle)
   

  const detalleUser = useSelector((state) => state.detalleUsuario); // Estado global con los datos del usuario


  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOpen2 = () => {
    setOpen2(!open2);
  };

  return (
    <div className={darkTheme ? stl.darktheme : stl.lighttheme}>
      <div className={stl.navbar}></div>

      <div className={stl.logo2}></div>
      <Link to="/homepage">
        <p className={stl.logo}>Adopt.Me</p>
      </Link>

      <div className={stl.algomas}>
        <Link to ="/blog">
        <button className={stl.blogInfo}>Blog</button>
        </Link>

        <div className={stl.dropdown}>
          <button className={stl.blogInfo} onClick={handleOpen}>
            Info
          </button>
          {open ? (
            <div className={stl.menu}>
              <div className={stl.opcionMenu}>
                <Link to="/givepet">
                  <button className={stl.buttonsBlog}>Dar en Adopcion</button>
                </Link>
              </div>
              <div className={stl.opcionMenu}>
                <Link to="/buscarmascota">
                  <button className={stl.buttonsBlog}>Mascota Perdida</button>
                </Link>
              </div>
              <div className={stl.opcionMenu}>
                <Link to="/reportarmaltrato">
                  <button className={stl.buttonsBlog}>Maltrato Animal</button>
                </Link>
              </div>
              <div className={stl.opcionMenu}>
                <Link to="/tepuedeinteresar">
                  <button className={stl.buttonsBlog}>+ Info</button>
                </Link>
              </div>
            </div>
          ) : null}
          {open ? <div></div> : <div></div>}
        </div>
        
        
      </div>

      {!isAuthenticated && (
        <div className={stl.login}>
          <Link to="/usuarios/signup">
            <button className={stl.buttons}>Registrarse</button>
          </Link>
          <Link to="/prueba">
            <button className={stl.buttons} >Ingresar</button>
            
          </Link>
        </div>
      )}
      {isAuthenticated && (
        <div className={stl.dropdown}>
          
                    
                    <div className={stl.AvatarPerfil} onClick={handleOpen2}>
                      <img className={stl.imagenPerfil} src={detalleUserGoogle.usuario ? detalleUserGoogle.fotoPerfil : detalleUser.fotoPerfil} width="40" alt="" />
                    </div>
          

          {open2 ? (
            <div className={stl.menuPerfil}>
                <Link to="/perfil">
                  <button className={stl.buttons2}>Mi perfil</button>
                </Link>
              
                <button className={stl.buttons2} onClick={() => logout()}>Cerrar sesión</button>
            

            </div>
          ) : null}
          {open2 ? <div></div> : <div></div>}
        </div>
      )}
    </div>
  );
}
