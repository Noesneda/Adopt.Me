import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import stl from "./MisFavoritos.module.css";
import getFavoritos from "../../Actions/getFavorito";
import CardFavoritos from "../Card/CardFavoritos";

export default function MisFavoritos() {

    const dispatch = useDispatch();


        

    const detalleUser = useSelector((state) => state.detalleUsuario);
    const favs = useSelector((state) => state.favoritos)

    useEffect(() => {
        dispatch(getFavoritos())
        window.scrollTo(0,0);
    }, [dispatch])

    const favs2 = favs.filter(({ userFav }) => userFav === detalleUser._id)
    
    return (
        <div className={stl.misfavoritos}>
            
            <div className={stl.cardfavoritos}>

                {favs2 && favs2.map(f => {

                    return (

                        <CardFavoritos
                        id = {f._id} 
                        nombre = {f.nombre}
                        favoritos = {f.favoritos}
                        />

                    )
                })}

            </div>

        </div>
    )
};
