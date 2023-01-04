import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import getDetalleUsuarioSinValidar from "../../Actions/getDetalleUsuarioSinValidar";
import postUsuario from "../../Actions/postUsuario";
import Toast from "light-toast";
import "./Validacion.css";

export default function Validacion() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const user = useSelector((state) => state.detalleUsuarioSinValidar);

  useEffect(() => {
    dispatch(getDetalleUsuarioSinValidar(id));
  }, [dispatch]);

  const usuario = user.usuario;
  const contrasena = user.contrasena;
  const nombre = user.nombre;
  const telefono = user.telefono;
  const mail = user.mail;
  const nacimiento = user.nacimiento;
  const localidad = user.localidad;
  const fotoPerfil = user.fotoPerfil;


  const [input, setInput] = useState({
    usuario: usuario,
    contrasena: contrasena,
    nombre: nombre,
    telefono: telefono,
    mail: mail,
    nacimiento: nacimiento,
    localidad: localidad,
    fotoPerfil: fotoPerfil,
  });

  function handleValidate(){
    setInput({
      usuario: usuario,
      contrasena: contrasena,
      nombre: nombre,
      telefono: telefono,
      mail: mail,
      nacimiento: nacimiento,
      localidad: localidad,
      fotoPerfil: fotoPerfil,
    });
    Toast.success("Email validado", 1500, () => {});
  }


  console.log('input', input)

  function onClick(e) {
    e.preventDefault();

    dispatch(postUsuario(input));

    setInput({
      usuario: usuario,
      contrasena: contrasena,
      nombre: nombre,
      telefono: telefono,
      mail: mail,
      nacimiento: nacimiento,
      localidad: localidad,
      fotoPerfil: fotoPerfil,
    });
    Toast.success("Email confirmado. Ya puedes ingresar con tu perfil", 1500, () => {
      navigate("/prueba")
    });
  }

  return (
    <div >
      <h1 className="titulo">Registro exitoso !!  Por favor primero valida tu email y luego Confirma la validacion</h1>
      <button className="botonesvalidacion" onClick={handleValidate}>Valide su email</button>    
      <button className="botonesvalidacion" onClick={onClick}>Confirmar validacion y Log In</button>
    </div>
  );
}