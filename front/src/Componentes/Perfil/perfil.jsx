import React , { useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../NavBar/NavBar";
import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import getDetalleUsuario from "../../Actions/getDetalleUsuario"
import css from "../Perfil/perfil.module.css"
import { Link } from "react-router-dom";
import MiInformacion from "../ContenidoPerfil/MiInformacion";
import MisFavoritos from "../ContenidoPerfil/MisFavoritos";
import CambiarContraseña from "../ContenidoPerfil/CambiarContraseña";
import CompletarRegistro from "../ContenidoPerfil/CompletarRegistro";
import MisMascotas from "../ContenidoPerfil/MisMascotas";
import getDetalleUsuarioGoogle from "../../Actions/getDetalleUsuarioGoogle";
import Footer from "../Footer/Footer";
import CartelRegistroCompleto from "../ContenidoPerfil/CartelRegistroCompleto";
import CartelCambiarContraseña from "../ContenidoPerfil/CartelCambiarContraseña";
import CartelCompletarRegistro from "../ContenidoPerfil/CartelCompletarRegistro";



export default function Perfil() {
    const { logout } = useAuth0()
    const dispatch = useDispatch();
    const [Render, setRender] = useState(1); 

    const { user, isAuthenticated } = useAuth0()

  
    
    let usuarioIdRaro = ""
    let id = ""
    if (isAuthenticated) {
        if (user.sub.startsWith("google")) {
            usuarioIdRaro = user.sub
            id = usuarioIdRaro.substring(14)
        }
        else {
            usuarioIdRaro = user.sub
            id = usuarioIdRaro.substring(6)
        }
    }
    

    useEffect(() => {
        dispatch(getDetalleUsuarioGoogle(id));
        window.scrollTo(0,0);
    }, [id, dispatch]);

    useEffect(() => {
            dispatch(getDetalleUsuario(id));
            window.scrollTo(0,0);
    }, [id, dispatch]);
    
    

    const detalleUser = useSelector((state) => state.detalleUsuario); // Estado global con los datos del usuario
    const usuario = detalleUser.roles[0]
    const detalleUserGoogle = useSelector((state) => state.detalleUsuarioGoogle) 

    /////////////////// ON CLICKS ////////////////////////

    
    
    function onClick1(e) {
        e.preventDefault()
        setRender(1)
    } 
    
    function onClick2(e) {
        e.preventDefault()
        setRender(2)
    } 
    function onClick3(e) {
        e.preventDefault()
        setRender(3)
    } 
    function onClick4(e) {
        e.preventDefault()
        setRender(4)
    } 
    function onClick5(e) {
        e.preventDefault()
        setRender(5)
    } 
    
    if (usuario === "6397ce1035c65595db3f409e") {
    return (
        <div >
            <NavBar/>
            <div className={css.container}>
                <div className={css.miniContainer}>
                    
                    <div className={css.sideBar}>
                       
                        <div>
                            <button onClick={(e) => onClick1(e)} className={css.botonSideBar}>Mi informacion</button>
                        </div>

                        <div >
                            <Link to="/panel-Administrador">
                        <button className={css.botonSideBar}>
                             Admin
                                </button>
                                </Link>
                            </div>
                       
                        <div>
                            <button onClick={(e) => onClick2(e)} className={css.botonSideBar}>Mis favoritos</button>
                        </div>
                     
                        <div>
                            <button onClick={(e) => onClick3(e)} className={css.botonSideBar}>Mis Mascotas</button>
                        </div>
                      
                        <div>
                            <button onClick={(e) => onClick4(e)} className={css.botonSideBar}>Cambiar contraseña</button>
                        </div>
                       
                        <div>
                            <button onClick={(e) => onClick5(e)} className={css.botonSideBar}>Completar registro</button>
                        </div>
                      
                        <div>
                            <Link to="/homepage">
                                <button className={css.botonSideBar}>Inicio</button>
                            </Link>
                        </div>
                        
                    </div>

                    <div className={css.contenido}> 
                        
                        
                        <div className={css.datos}>
                        {Render === 1 && detalleUser.usuario ? <MiInformacion datos={detalleUser} /> : null}
                        {Render === 1 && detalleUserGoogle.usuario ? <MiInformacion datos={detalleUserGoogle} /> : null}
                        {Render === 1 && !detalleUser.usuario && !detalleUserGoogle.usuario ? <CartelCompletarRegistro></CartelCompletarRegistro> : null}
                        
                        {Render === 2 ? <MisFavoritos></MisFavoritos>: null }
                        {Render === 3 ? <MisMascotas></MisMascotas> : null}

                        
                        {Render === 4 && detalleUser.usuario  ?  <CambiarContraseña></CambiarContraseña> : null}
                        {Render === 4 && detalleUserGoogle.usuario ? <CartelCambiarContraseña></CartelCambiarContraseña> : null}
                        {Render === 4 && !detalleUserGoogle.usuario && !detalleUser.usuario ? <CartelCambiarContraseña></CartelCambiarContraseña> : null}
                       
                            
                        {Render === 5 && detalleUser.usuario ? <CartelRegistroCompleto></CartelRegistroCompleto> : null}
                        {Render === 5 && detalleUserGoogle.usuario ? <CartelRegistroCompleto></CartelRegistroCompleto> : null}
                        {Render === 5 && !detalleUser.usuario && !detalleUserGoogle.usuario ? <CompletarRegistro></CompletarRegistro> : null}
                        </div>
                        
                        
                    </div>
                    
                </div>
                <Footer></Footer>
            </div>

            

            
        </div>
    
    )
} else if (usuario === "6397ce1035c65595db3f409d" || detalleUserGoogle.lenght === 1) {
    return (
        <div >
            <NavBar/>
            <div className={css.container}>
                <div className={css.miniContainer}>
                    
                    <div className={css.sideBar}>
                       
                        <div>
                            <button onClick={(e) => onClick1(e)} className={css.botonSideBar}>Mi informacion</button>
                        </div>
                       
                        <div>
                            <button onClick={(e) => onClick2(e)} className={css.botonSideBar}>Mis favoritos</button>
                        </div>
                     
                        <div>
                            <button onClick={(e) => onClick3(e)} className={css.botonSideBar}>Mis Mascotas</button>
                        </div>
                      
                        <div>
                            <button onClick={(e) => onClick4(e)} className={css.botonSideBar}>Cambiar contraseña</button>
                        </div>
                       
                        <div>
                            <button onClick={(e) => onClick5(e)} className={css.botonSideBar}>Completar registro</button>
                        </div>
                      
                        <div>
                            <Link to="/homepage">
                                <button className={css.botonSideBar}>Inicio</button>
                            </Link>
                        </div>
                        
                    </div>

                    <div className={css.contenido}> 
                        
                        
                        <div className={css.datos}>
                        {Render === 1 && detalleUser.usuario ? <MiInformacion datos={detalleUser} /> : null}
                        {Render === 1 && detalleUserGoogle.usuario ? <MiInformacion datos={detalleUserGoogle} /> : null}
                        {Render === 1 && !detalleUser.usuario && !detalleUserGoogle.usuario ? <CartelCompletarRegistro></CartelCompletarRegistro> : null}
                        
                        {Render === 2 ? <MisFavoritos></MisFavoritos>: null }
                        {Render === 3 ? <MisMascotas></MisMascotas> : null}

                        
                        {Render === 4 && detalleUser.usuario  ?  <CambiarContraseña></CambiarContraseña> : null}
                        {Render === 4 && detalleUserGoogle.usuario ? <CartelCambiarContraseña></CartelCambiarContraseña> : null}
                        {Render === 4 && !detalleUserGoogle.usuario && !detalleUser.usuario ? <CartelCambiarContraseña></CartelCambiarContraseña> : null}
                       
                            
                        {Render === 5 && detalleUser.usuario ? <CartelRegistroCompleto></CartelRegistroCompleto> : null}
                        {Render === 5 && detalleUserGoogle.usuario ? <CartelRegistroCompleto></CartelRegistroCompleto> : null}
                        {Render === 5 && !detalleUser.usuario && !detalleUserGoogle.usuario ? <CompletarRegistro></CompletarRegistro> : null}
                        </div>
                        
                        
                    </div>
                    
                </div>
                <Footer></Footer>
            </div>

            

            
        </div>
    
    )
}
};



// Una vez que esta logueado el usuario --> despachar una action de getusuariodetalle --> guardarlo en el estado global --> usar los datos desde el estado

// Cuando se desloguea --> despachar action para limpiar el estado global.