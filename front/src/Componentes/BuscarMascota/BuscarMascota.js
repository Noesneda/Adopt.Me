import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CardPerdidos from '../../Componentes/CardPerdidos/CardPerdidos';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import stl from "../BuscarMascota/BuscarMascota.module.css";
import FloatingUI from "../Floating UI/FloatingUI";
import getAnimalesPerdidos from "../../Actions/getAnimalesPerdidos";
import filtradoEstadoPerdido from "../../Actions/filtradoEstadoPerdido";
import getTamañofiltro from "../../Actions/getTamañoFiltro";
import getGatoPerdido from "../../Actions/getGatosPerdidos";
import {useSelector, useDispatch} from 'react-redux';
import { useState } from "react";
import Paging from "../Pagination/Pagination";
import getPerroPerdido from "../../Actions/getPerrosPerdidos";
import Loading from "../Loader/Loader";

export default function BuscarMascota() {
  const params = useParams();
  const dispatch = useDispatch();
  const allPets = useSelector((state)=>state.animalesPerdidosCopia);
  const [currentPage, setCurrentPage] = useState(1);
  const [mascotasPerPage] = useState(4);
  const lastPetIndex = currentPage * mascotasPerPage; 
  const firstPetIndex = lastPetIndex - mascotasPerPage ;
  const currentPets = allPets.slice(firstPetIndex,lastPetIndex);
  const actualPage = (pageNumber) => {setCurrentPage(pageNumber)};
  console.log("pets", currentPets)

    

  useEffect(()=>{      
    dispatch(getAnimalesPerdidos());
    dispatch(getGatoPerdido());
    dispatch(getPerroPerdido());   
    setCurrentPage(1)
    window.scrollTo(0,0);
  }, [dispatch]);


  function handleTamaño (e){  
    e.preventDefault();   
    dispatch(getTamañofiltro(e.target.value));
  };
  function handleEstado (e){  
    e.preventDefault();   
    dispatch(filtradoEstadoPerdido(e.target.value));
  };
  function handleGato (e){  
    e.preventDefault();   
    dispatch(getGatoPerdido(e.target.value))    
  };
  function handlePerro (e){  
    e.preventDefault();   
    dispatch(getPerroPerdido(e.target.value)); 
  };
  function handleRecargar (e){  
    e.preventDefault();   

    dispatch(getAnimalesPerdidos(e.target.value));
    setCurrentPage(1)
  };

  if (allPets.length === 0) {
    return (
        <>
        <Loading />
        </>
    )
}

  return (

      <div className={stl.paginaadopcionperros} key={params.id}>
      <NavBar />
      <FloatingUI />
      <div>
        <h1 className={stl.tituloPerros}>BUSCA AQUI TU MASCOTA PERDIDA</h1>
      </div>

      <div>
      <button className={stl.btnNavHome} onClick= {(e)=>handleRecargar(e)}>RECARGAR</button>
      </div>

       

    <div className={stl.filtros}>
      <div>
      <select className={stl.op} onChange={(e)=>handleTamaño(e)}>
                <option value='All' disabled selected defaultValue>Tamaño</option>
                <option value = 'Chico'>Chico</option>
                <option value = 'Mediano'>Mediano</option>
                <option value = 'Grande'>Grande</option>                               
            </select>            
      </div>

      <div>
      <select className={stl.op} onChange={(e)=>handleEstado(e)}>
                <option value='estado' disabled selected defaultValue>Estado</option>
                <option value = 'Perdido'>Perdido</option>
                <option value = 'Encontrado'>Encontrado</option>                                           
            </select>           
      </div>
      </div>

    <div className={stl.perrogato}>
      <div>
        <button className={stl.btnNav} onClick={(e)=>handleGato(e)}>Gatos</button>
      </div>
      
      <div>
        <button className={stl.btnNav} onClick={(e)=>handlePerro(e)}>Perros</button>
      </div>
      </div>

      <div>
        <Link to ="/viewlostpets">
        <button className={stl.btnMap}>Ver mascotas perdidas en el mapa</button>
        </Link>
      </div>

    <div className={stl.paginado}>
      <Paging
        mascotasPerPage={mascotasPerPage} 
        allPets={allPets.length} 
        currentPage={currentPage} 
        actualPage={actualPage}
        currentPets={currentPets}
       />
  </div>
  
    <div className={stl.listadoCards}>

      {currentPets.length > 0 && currentPets.map(a =>{
        return(  
        <CardPerdidos
        id = {a._id}
        gato = {a.gato}
        perro = {a.perro}
        tama = {a.tama}       
        description = {a.descripcion}
        estado = {a.estado}
        imagen = {a.imagen}
        />                  
               )
           })}

      
      <Link to="/homepage">
        <button className={stl.boton}>VOLVER</button>
      </Link>


</div>
      <Footer />
</div>
  
  );
};