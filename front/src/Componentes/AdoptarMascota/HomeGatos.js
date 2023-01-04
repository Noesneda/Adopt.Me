import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import  {Link}  from "react-router-dom"
import getgato from "../../Actions/getgatos";
import CardGato from "../Card/CardGato";
import NavBar from "../NavBar/NavBar";
import Paging from "../Pagination/Pagination";
import stl from './HomePerros.module.css';
import ordenAlfaGato from "../../Actions/ordenAlfaGato";
import FloatingUI from "../Floating UI/FloatingUI";
import getCatTamaños from "../../Actions/getCatTamaños";
import getCatEdad from '../../Actions/getCatEdad';
import Footer from "../Footer/Footer";
import Loading from "../Loader/Loader";

const HomeGatos = () => {

    const dispatch = useDispatch()
    const copiaGatos = useSelector((state)=>state.gatosCopia);
    const sinAdopcion = copiaGatos
    const sinAdoptar = sinAdopcion.filter(({ adoptado }) => adoptado === false)
    const [currentPage, setCurrentPage] = useState(1) 
    const [mascotasPerPage] = useState(4)
    const lastPetIndex = currentPage * mascotasPerPage 
    const firstPetIndex = lastPetIndex - mascotasPerPage 
    const currentPets = sinAdoptar.slice(firstPetIndex,lastPetIndex) 
    const [orden, setOrden] = useState("");
    const actualPage = (pageNumber) => {setCurrentPage(pageNumber)}


        

    useEffect(()=>{
        dispatch(getgato())
        window.scrollTo(0,0);
    }, [dispatch])
    
    // if(allPets.map(e=>e.perro === true))
    const handleClick = (e) => {
        e.preventDefault()
        window.location.reload();
        }


   const handleOrden = (e) => {
    e.preventDefault();
    dispatch(ordenAlfaGato(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
  }

   function handleTamaño (e){  
     e.preventDefault();   
     dispatch(getCatTamaños(e.target.value));
    console.log(e.target.value);
  };
   function handleEdad (e){  
     e.preventDefault();   
     dispatch(getCatEdad(e.target.value));
    console.log(e.target.value);
  };

  if (copiaGatos.length === 0) {
    return (
        <>
        <Loading />
        </>
    )
}

    return (

        <div className={stl.paginaadopcionperros}>
            <NavBar/>
            <FloatingUI />
        <div className={stl.tituloPerros}>Gatos en Adopcion</div>
        <br></br><br></br>
       
        <div>
        <button className={stl.btnNavHome} onClick={handleClick}>Todos</button>
        </div>
        <br></br>
        <div className={stl.filtros}>Filtar: 
               
               <select className={stl.op} onChange={(e) => handleOrden(e)}>
                    <option disabled selected defaultValue>Alfabeticamente</option>
                    <option value='A-Z'>A-Z</option>
                    <option value='Z-A'>Z-A</option>
                </select>
                <select className={stl.op} onChange={(e)=>handleTamaño(e)}>
                <option value='All' disabled selected defaultValue>Tamaño</option>
                <option value = 'Mediano'>Mediano</option>
                <option value = 'Chico'>Chico</option>
                <option value = 'Grande'>Grande</option>                               
                </select> 
                <select className={stl.op} onChange={(e)=>handleEdad(e)}>
                <option value='edad' disabled selected defaultValue>Edad</option>
                <option value = 'Menos de 45 dias'>Menos de 45 dias</option>
                <option value = 'Mas de 45 dias'>Mas de 45 dias</option>
                <option value = 'Adulto'>Adulto</option>
                <option value = 'Anciano'>Anciano</option>                                  
                </select> 
              
        </div>
        <br/>
        
<br></br>
        <div className={stl.ico}></div>
        <div className={stl.mapapets}>
            <Link to ="/mappets2">
           <button className={stl.btnMap}>Ver mascotas a mi alrededor</button>
           </Link>
        </div>

        <div className={stl.paginado}>
        <Paging 
        mascotasPerPage={mascotasPerPage} 
        allPets={copiaGatos.length} 
        currentPage={currentPage} 
        actualPage={actualPage}
        currentPets={currentPets}
        />
        </div>

        <div className={stl.listadoCards}>


            {currentPets.length > 0 && currentPets.map(g =>{

                return(
                  
                        <CardGato
                        id = {g._id}
                        gato = {g.gato}
                        nombre = {g.nombre}
                        imagen={g.imagen}
                        edad={g.edad}
                        />                  
                )
            })}
            

        </div>

            <Footer />
        </div>
    )
}

export default HomeGatos;