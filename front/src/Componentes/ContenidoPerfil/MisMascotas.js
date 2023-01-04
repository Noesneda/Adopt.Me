import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import stl from "./MisMascotas.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import getmascotas from "../../Actions/getmascotas";
import CardPruebaNacho from "../Card/CardPruebaNacho";
import getDetalleUsuarioGoogle from "../../Actions/getDetalleUsuarioGoogle";
import getDetalleUsuario from "../../Actions/getDetalleUsuario"
import Paging from "../Pagination/Pagination";

export default function MisMascotas() {

  const dispatch = useDispatch();
  const animales = useSelector((state) => state.animales);
  const { user, isAuthenticated } = useAuth0();

 
    

  useEffect(() => {
    dispatch(getmascotas());
    window.scrollTo(0,0);
  }, [dispatch]);

    
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
    }, [id, dispatch]);

    useEffect(() => {
            dispatch(getDetalleUsuario(id));
    }, [id, dispatch]);
    
    

    const detalleUser = useSelector((state) => state.detalleUsuario); // Estado global con los datos del usuario

    const detalleUserGoogle = useSelector((state) => state.detalleUsuarioGoogle) 

    
    let _id = ""
    if (detalleUserGoogle.usuario) {
        _id = detalleUserGoogle._id
    } else {
        _id = detalleUser._id
    }


  let mascotasFiltradas = animales.filter(
      (p) => p.pichina === _id
  );

  const [currentPage, setCurrentPage] = useState(1) 
  const [mascotasPerPage] = useState(4)

  const lastPetIndex = currentPage * mascotasPerPage 
  const firstPetIndex = lastPetIndex - mascotasPerPage 
  const currentPets = mascotasFiltradas.slice(firstPetIndex,lastPetIndex) 
  const actualPage = (pageNumber) => {setCurrentPage(pageNumber)}
 
  return (
      <div>
        <div className={stl.paginado}>
        <Paging 
        mascotasPerPage={mascotasPerPage} 
        allPets={mascotasFiltradas.length} 
        currentPage={currentPage}
        actualPage={actualPage}
        currentPets={currentPets}
        />
        </div>
      <div className={stl.cartel}>
        
        {currentPets.map(e => 

        <CardPruebaNacho 
        nombre={e.nombre} 
        id={e._id} 
        estado={e.estado} 
        imagen={e.imagen} 
        />

        )}
          
    </div>

    <div className={stl.paginado}>
        <Paging 
        mascotasPerPage={mascotasPerPage} 
        allPets={mascotasFiltradas.length} 
        currentPage={currentPage}
        actualPage={actualPage}
        currentPets={currentPets}
        />
        </div>
        
    </div>
  );
}
