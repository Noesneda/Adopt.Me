import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import stl from "./CompletarRegistro.module.css";
import getusers from "../../Actions/getusers";
import { useAuth0 } from "@auth0/auth0-react";
import Toast from "light-toast";
import createUserGoogle from "../../Actions/createUserGoogle";

export default function FormRegistro() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Metodo de router que me redirige a la ruta que yo le diga
  const Allusers = useSelector((state) => state.users).data; // (o el estado global que usemos para guardar todos los usuarios)
  const { user, isAuthenticated } = useAuth0();
  
    

  useEffect(() => {
    dispatch(getusers());
    window.scrollTo(0,0);
  }, [dispatch]);

  const [input, setInput] = useState({
    usuario: "",
    nombre: user.name,
    telefono: "",
    mail: user.email,
    nacimiento: "",
    localidad: "",
    fotoPerfil: user.picture,
    caca: user.sub.substring(14),
  });

  const [errors, setErrors] = useState({});
  const [isSubmit, setisSubmit] = useState(true);

  function validation(input) {
    let errors = {};
    let noRepeatUser = Allusers.filter((u) => u.usuario === input.usuario);

    if (!input.usuario) {
      errors.usuario = "Tenes que ingresar un nombre de usuario";
    }
    if (
      !/^(?=.[a-zA-Z]{1,})(?=.[\d]{0,})[a-zA-Z0-9]{1,15}$/.test(input.usuario)
    ) {
      // max 15 caracteres alfanumericos
      errors.usuario = "El nombre de usuario no es válido";
    }
    if (noRepeatUser.length) {
      errors.usuario = `El nombre de usuario ${input.usuario} no está disponible`;
    }

    if (!input.telefono) {
      errors.telefono = "Tenes que ingresar un telefono";
    }
    if (!/^[0-9]*(\.?)[0-9]+$/.test(input.telefono)) {
      errors.telefono = "Este campo solo debe contener numeros";
    }
    if (input.telefono.length > 15) {
      errors.telefono = "El teléfono no es válido";
    }

    if (!input.nacimiento) {
      errors.nacimiento = "Tenes que ingresar una fecha de nacimiento";
    } else if (
      input.nacimiento.length > 10 ||
      !/^[0-9-]+$/.test(input.nacimiento)
    ) {
      errors.nacimiento = "Tenes  que ingresar una fecha válida (dd-mm-yyyy)";
    }

    if (Object.keys(errors).length === 0) {
      setisSubmit(true);
    }

    return errors;
  }

  function handleSubmit(e) {
    console.log("Ingreso al handleSubmit");
    e.preventDefault();
    console.log(Allusers);
    //Si no hay errores, el isSubmit esta en true
    if (isSubmit) {
      console.log(
        "OK. Formulario recibido. Despacho la action con estos datos:"
      );
      console.log(input);
      dispatch(createUserGoogle(input));
      setInput({
        usuario: "",
        contraseña: "",
        repitaContraseña: "",
        nombre: "",
        telefono: "",
        mail: "",
        nacimiento: "",
        localidad: "",
        fotoPerfil: "",
        caca: "",
      });

      Toast.success("Usuario creado correctamente", 1500, () => {
        navigate("/homepage");
      });
    } else {
      Toast.fail(
        "No se pudo completar el registro, revise los campos",
        1500,
        () => {}
      );
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })); // e.target.name seria el input que se va a estar modificando

    setErrors(
      validation({
        // voy a tomar el valor del input que se modifico y voy a ir llenando el estado
        ...input,
        [e.target.name]: [e.target.value],
      })
    );
  }

  return (
    <div className={stl.registro} key={params.id}>
      <div className={stl.form} key={params.id}>
        <br></br>
        <br></br>
        <form
          onSubmit={(e) => handleSubmit(e)}
          action="/usuarios/signup"
          method="POST"
        >
          <div className={stl.datosRegistro} key={params.id}>
            <div className={stl.label}>NOMBRE DE USUARIO: </div>
            <input
              className={stl.inputs}
              type="text"
              pipo
              name="usuario"
              value={input.usuario}
              onChange={(e) => handleChange(e)}
            />
            {errors.usuario && <p className={stl.err}>{errors.usuario}</p>}
            <span></span>
          </div>
          <br></br>

          <div className={stl.datosRegistro} key={params.id}>
            <div className={stl.label}>TELÉFONO DE CONTACTO: </div>
            <input
              className={stl.inputs}
              type="text"
              required
              name="telefono"
              value={input.telefono}
              onChange={(e) => handleChange(e)}
            />
            {errors.telefono && <p className={stl.err}>{errors.telefono}</p>}
            <span></span>
          </div>
          <br></br>

          <div className={stl.datosRegistro} key={params.id}>
            <div className={stl.label}>FECHA DE NACIMIENTO: </div>
            <input
              className={stl.inputs}
              required
              type="date"
              name="nacimiento"
              value={input.nacimiento}
              placeholder="dd-mm-yyyy"
              onChange={(e) => handleChange(e)}
            />
            {errors.nacimiento && (
              <p className={stl.err}>{errors.nacimiento}</p>
            )}
            <span></span>
          </div>
          <br></br>

          <div className={stl.datosRegistro} key={params.id}>
            <div className={stl.label}>LOCALIDAD: </div>
            <input
              className={stl.inputs}
              type="text"
              required
              name="localidad"
              value={input.localidad}
              onChange={(e) => handleChange(e)}
            />
            {errors.localidad && <p className={stl.err}>{errors.localidad}</p>}
            <span></span>
          </div>
          <br></br>
          <br></br>
          <div>
            <button
              className={stl.botonActualizar}
              type="submit"
              disabled={isSubmit ? false : true}
            >
              ACEPTAR
            </button>
            <br></br>
            <br></br>
          </div>
        </form>
      </div>
    </div>
  );
}
