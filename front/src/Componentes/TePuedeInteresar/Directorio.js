import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import FloatingUI from "../Floating UI/FloatingUI";
import stl from "../TePuedeInteresar/Directorio.module.css";

export default function Directorio () {

    const params = useParams();

    useEffect(() => {
        window.scrollTo(0,0);
      }, [])
        

    return (

        <div>

        <NavBar />
        
        <div className={stl.paginadirectorio} key={params.id}>
            
            <FloatingUI />

            <div className={stl.hogares}>

            <div className={stl.titulodirectorio}>HOGARES DE TRANSITO</div>

            <div className={stl.grupohogares}>
            <div className={stl.hogarestransito}>
                <div className={stl.imagen4patas}></div>
            <div>Proyecto 4 patas</div>
            <a href="https://www.proyecto4patas.org/hogar-de-transito/" target="_blank" rel="noreferrer">Sitio web</a>
            </div>

            <div className={stl.hogarestransito}>
            <div className={stl.imagenvidaanimal}></div>
            <div>Vida Animal</div>
            <a href="https://www.vidanimal.org.ar/como-ayudar/ofrece-hogar-de-transito/#:~:text=%C2%BFQu%C3%A9%20es%20un%20hogar%20transitorio,indicada%20que%20lo%20adopte%20definitivamente." target="_blank" rel="noreferrer">Sitio web</a>
            </div>

            <div className={stl.hogarestransito}>
            <div className={stl.imagencancat}></div>
            <div>CanCat</div>
            <a href="https://cancat.com.ar/transito-y-adopcion-de-mascotas/" target="_blank" rel="noreferrer">Sitio web</a>
            </div>

            <div className={stl.hogarestransito}>
            <div className={stl.imagennaricitas}></div>
            <div>Naricitas Frias</div>
            <a href="https://www.naricitasfrias.com.ar/" target="_blank" rel="noreferrer">Sitio web</a>
            </div>

            <div className={stl.hogarestransito}>
            <div className={stl.imagenbsasgob}></div>
            <div>Perro Comunitario - Buenos Aires Gob</div>
            <a href="https://www.buenosaires.gob.ar/basolidaria/participa/perro-comunitario-casa-de-transito" target="_blank" rel="noreferrer">Sitio web</a>
            </div>
            </div>

            </div>

            <Link to='/tepuedeinteresar'>
                <button className={stl.botondirectorio}>VOLVER</button>
            </Link>
            
      
            <Footer />
           
        </div>
        </div>
    )
}