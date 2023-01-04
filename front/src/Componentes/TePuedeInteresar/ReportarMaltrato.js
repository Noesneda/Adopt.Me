import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FloatingUI from "../Floating UI/FloatingUI";
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import stl from "../TePuedeInteresar/ReportarMaltrato.module.css";

export default function ReportarMaltrato () {

    const params = useParams();

    useEffect(() => {
        window.scrollTo(0,0);
      }, [])
        

    return (
        <div className={stl.maltrato} key={params.id}>
            
            <NavBar />
            <FloatingUI />

            <div>
            <h1 className={stl.titulo}>REPORTAR MALTRATO ANIMAL</h1>
            <h2 className={stl.ley}>La ley 14.346 protege a los animales del maltrato y la crueldad de las personas. Estos actos son delitos penados con prisión de 15 días a 1 año y podés denunciarlos.</h2>
            </div>

            <div>
                <h3 className={stl.h3s}>¿Qué se entiende por maltrato a animales?</h3>
                <ul>
                    <li>No alimentarlos bien.</li>
                    <li>Estimularlos con instrumentos que les causan dolor, como el látigo.</li>
                    <li>Hacerlos trabajar muchas horas sin descanso.</li>
                    <li>Hacerlos trabajar cuando no están en buen estado físico.</li>
                    <li>Estimularlos con drogas sin fines terapéuticos.</li>
                    <li>Usarlos para llevar vehículos muy pesados.</li>
                </ul>
            </div>

            <div>
                <h3 className={stl.h3s}>¿Qué se entiende por actos de crueldad con los animales?</h3>
                <ul>
                    <li>No alimentarlos bien.</li>
                    <li>Cortar cualquier parte del cuerpo del animal, salvo para marcación o higiene.</li>
                    <li>Operar a animales sin anestesia y sin tener título de médico o veterinario, salvo caso de urgencia.</li>
                    <li>Hacer experimentos con animales.</li>
                    <li>Abandonar a los animales utilizados en experimentos.</li>
                    <li>Matar a animales en estado de embarazo.</li>
                    <li>Lastimar y atropellar animales intencionalmente, causarles torturas o sufrimientos innecesarios o matarlos por perversidad.</li>
                    <li>Hacer actos públicos o privados de peleas de animales.</li>
                    <li>Hacer corridas de toros en que se mata, lastima o agrede a los animales.</li>
                </ul>
            </div>

            <div>
                <h3 className={stl.h3s}>¿Donde se puede realizar la denuncia?</h3>
                <ul>
                    <li>En la comisaría más cercana al lugar donde ocurrió el hecho.</li>
                    <li>En la fiscalía o UFI (Unidad Funcional de Instrucción).</li>
                    <li>En el Juzgado de instrucción.</li>
                </ul>
            </div>

            <div>
                <h3 className={stl.h3s}>¿Que hacer si el hecho ocurre en la vía pública?</h3>
                <p className={stl.ps}>Llamá al 911. En Ciudad de Buenos Aires también podés llamar al 0800-333-47225 que es el teléfono del Ministerio Público Fiscal de la Ciudad que funciona las 24 horas.</p>
            </div>

            <div>
                <h3 className={stl.h3s}>¿Que hacer si el hecho ocurre en un lugar privado?</h3>
                <p className={stl.ps}>Si el hecho sucede en una casa, galpón, quinta, etc. no ingreses. Identificá el lugar (calle, número, etc.) y a las personas y llamá al 911.</p>
            </div>

            <div>
                <h3>Fuente:<a href="https://www.argentina.gob.ar/justicia/derechofacil/leysimple/maltrato-animales" title="gob" target="_blank" rel="noreferrer">argentina.gob.ar</a></h3>
            </div>

            <Link to='/homepage'>
                <button className={stl.boton}>VOLVER</button>
            </Link>
            
            <Footer />

        </div>
    )
}