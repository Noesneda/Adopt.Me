import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import stl from "../TePuedeInteresar/TePuedeInteresar.module.css";
import FloatingUI from "../Floating UI/FloatingUI";

export default function TePuedeInteresar () {

    const params = useParams();

    useEffect(() => {
        window.scrollTo(0,0);
      }, [])
        

    return (

        <div className={stl.pagina} key={params.id}>
            
            <NavBar />
            <FloatingUI />

            <h1 className={stl.titulo}>TE PUEDE INTERESAR</h1>

            <p className={stl.texto}>En esta seccion encontraras datos utiles como veterinarias y hogares de transito<br></br>
            <br>
            </br>
            Ademas tendras acceso el blog para compartir tu experiencias con otras personas</p>

            <div className={stl.veterinarias}>
                <p>Hospitales Veterinarios</p>
            <iframe title="veterinarias" src="https://www.google.com/maps/d/embed?mid=1o7saHY6jCTeLP6EWNsvv0OHvydS8oNs&ehbc=2E312F" width="640" height="480"></iframe>
            </div>

            <div className={stl.vacunacion}></div>

            <Link to = '/directorio'> 
            <button className={stl.boton}>HOGARES DE TRANSITO</button>
            </Link>

            <Link to ="/blog">
            <button className={stl.boton}>BLOG</button>
            </Link>

            <Link to='/homepage'>
                <button className={stl.boton}>VOLVER</button>
            </Link>
            
            <Footer />

        </div>
    )
}