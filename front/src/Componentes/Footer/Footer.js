import React from "react";
import stl from "../Footer/Footer.module.css";
import { Link } from "react-router-dom";


export default function Footer() {
                                                                           
    return (

        <div className={stl.footer}>

            <div className={stl.titulo}>
                <h2>@ Adopt.Me</h2>
                <div>adoptmeargentina@gmail.com</div><br></br>
                <div>Copyright 2022 - Todos los derechos reservados</div>
            </div>

            <div className={stl.columnas}>
{/* 
            <div className={stl.columna1}>
                <h3>Compañia</h3>
                <h5>Sobre nosotros</h5>
                <h5>Inscribe tu Empresa</h5>
            </div>

            <div className={stl.columna2}>
                <h3>Comunidad</h3>
                <h5>Historias de exito</h5>
                <h5>Galeria</h5>
                <h5>Donar</h5>
                <h5>Recursos</h5>
            </div>

            <div className={stl.columna3}>
                <h3>Enlaces de ayuda</h3>
                <h5>Centros de ayuda</h5>
                <h5>Aviso de privacidad</h5>
                <h5>Politica de cookies</h5>
                <h5>Terminos y condiciones</h5>
            </div>

            <div className={stl.columna4}>
                <h3>FAQ</h3>
                <h5>Como adoptar</h5>
                <h5>Quiero reportar un animal perdido</h5>
                <h5>Quiero reportar maltrato</h5>
                <h5>Entidades de ayuda</h5>
            </div> */}

            </div>
            
            <div className={stl.iconos}>
                
                    <div className={stl.facebootexto}>Facebook</div>
                    <a href="https://www.facebook.com/profile.php?id=100088704424730" target="_blank" rel="noreferrer" className={stl.facebook}></a>
               
                    <div className={stl.instagramtexto}>Instagram</div>
                    <a href="https://www.instagram.com/adopt.me.adopcion.mascotas/" target="_blank" rel="noreferrer" className={stl.instagram}></a>
              
            </div>

        </div>

    )
}