// import e from "connect-flash";
import React from "react";
import { useDispatch } from "react-redux";
import stl from "./CardUser.module.css"; 
import deleteUser from "../../Actions/deleteUser";
import Toast from "light-toast";
import { useNavigate } from "react-router-dom";

export default function CardUser({id, usuario, nombre}) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleDelete() {
    dispatch(deleteUser(id)) 
    Toast.success("Usuario eliminado con exito", 1500, () => {
      navigate("/panel-Administrador")
    });
  }

  return (
    <div className={stl.infoContein}>
      <div className={stl.infoCardUser}>Usuario: {usuario} - Nombre: {nombre}</div>
      <button className={stl.botonEliminar} onClick={handleDelete}>Eliminar este usuario</button>
    </div>
      
    );
  }
