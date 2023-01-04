import NavBarPAdmin from "../PanelAdministrador/NavBarPAdmin" ;
// import TotalUsuarios from "../PAdmChartsClientes/TotalUsuarios";
// import stl from "./mascotas.module.css";
import stl from "./Usuarios.module.css";
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import  {useNavigate}  from "react-router-dom";
import getusers from "../../Actions/getusers";
import FloatingUI from "../Floating UI/FloatingUI";
import Footer from "../Footer/Footer";
import CardUser from "../CardUser/CardUser";
// import Paging from "../Pagination/Pagination"


const Usuarios = () => {

 const dispatch = useDispatch();
 const navigate = useNavigate();

  
 const allUsersData = useSelector((state) => state.users)
 const usuarios = allUsersData.data
 const cantidadUsuarios = usuarios.length
 console.log(cantidadUsuarios)

  /* const allUsers = allUsersData.data 
   console.log(allUsersData)*/
  // const [currentPage, setCurrentPage] = useState(1) 
  // const [mascotasPerPage] = useState(4)

  // const lastPetIndex = currentPage * mascotasPerPage 
  // const firstPetIndex = lastPetIndex - mascotasPerPage 
  // const currentPets = usuarios.slice(firstPetIndex,lastPetIndex) 


  const [setInput] = useState("");
  
  const [searchClient, setSearchClient] = useState("");
/*   const [localCat, setlocalCat] = useState(""); */

  // const actualPage = (pageNumber) => {setCurrentPage(pageNumber)}

  useEffect(()=>{
      dispatch(getusers())
      // setCurrentPage(1)
  }, [dispatch])


     const handleClick = (e) => {
      e.preventDefault()
      window.location.reload();
      } 

  const handleInput = (e) => {
      e.preventDefault();
      setSearchClient(e.target.value)
  }

  const handleSubmit = (e) => {//mando la accion y me trae el dog
      e.preventDefault();
      if(searchClient){
      dispatch(getusers(searchClient))
      setInput("")
      navigate("/panel-Administrador/usuarios") 
      // actualPage(1)
      }
 }



  return(
    <div>
      <div>
        <h2>INFORME GENERAL DE NUESTROS USUARIOS</h2>
      </div>
       <div>
        <NavBarPAdmin />
       </div>
       <div>
        <div className={stl.cantidadusuarios}>Cantidad de Usuarios: {cantidadUsuarios}</div>
       </div>


     
    <div>
        <label className={stl.labelSearch}>Nombre:</label>
           <input className={stl.inputNav}
               value={searchClient}
               type="text"
               placeholder=" Nombre..."
               onChange={handleInput}>
           </input>
           <button className={stl.btnNav}
               type="submit"
               onClick={handleSubmit}>Ir</button>    
      </div>
    
      <FloatingUI />
        <br/>
        <div>
            <button className={stl.btnNavHome} onClick={handleClick}>Refresh</button>
        </div>
    
      {/*<div className={stl.paginado}>
         <Paging 
        mascotasPerPage={mascotasPerPage} 
        allPets={allUsersData.length} 
        currentPage={currentPage}
        actualPage={actualPage}
        currentPets={currentPets}
        /> 
        </div>*/}

        <div className={stl.listadoCards}> 
     

        {usuarios && usuarios.map(p => {

              return (  

               <div>

                     <CardUser
                     id={p._id}
                     usuario={p.usuario}
                     nombre={p.nombre}                
  
                     />
                       
                </div>
                                                                                              
            )
          })     
                                  
        }</div> 

      <Footer />
    </div>
  )
}

export default Usuarios;