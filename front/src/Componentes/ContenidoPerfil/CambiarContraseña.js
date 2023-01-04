import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import stl from "./CambiarContraseña.module.css";
import createuser from "../../Actions/createuser";
import getusers from "../../Actions/getusers";
import FloatingUI from "../Floating UI/FloatingUI";
import Toast from "light-toast";
import putUsuario from "../../Actions/putUsuario";
const bcrypt = require("bcryptjs");

export default function CambiarContraseña() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Metodo de router que me redirige a la ruta que yo le diga

  const Allusers = useSelector((state) => state.users).data; // (o el estado global que usemos para guardar todos los usuarios)
  const detalleUserGoogle = useSelector((state) => state.detalleUsuarioGoogle);
  const detalleUser = useSelector((state) => state.detalleUsuario);

  let UserGoogle = false;
  if (detalleUserGoogle.nombre) {
    UserGoogle = true;
  }

  let id = detalleUser._id;

  useEffect(() => {
    dispatch(getusers());
  }, [dispatch]);

  const [input, setInput] = useState({
    contraseñaActual: "",
    nuevaContraseña: "",
    repitaContraseña: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmit, setisSubmit] = useState(false);

  function validation(input) {
    let errors = {};
    
    if (
      !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.nuevaContraseña)
    ) {
      errors.nuevaContraseña =
        "La contraseña debe tener entre 8 y 16 caracteres, al menos un número, al menos una minúscula y al menos una mayúscula.";
    }
    if (input.repitaContraseña !== input.nuevaContraseña) {
      errors.repitaContraseña = "Las contraseñas no coinciden";
    }
    if (
      !input.contraseñaActual ||
      !input.nuevaContraseña ||
      !input.repitaContraseña
    ) {
      errors.campos = "Tenes que completar todos los campos";
    }

    if (Object.keys(errors).length === 0) {
      setisSubmit(true);
    }

    return errors;
  }


  async function handleSubmit(e) {
    e.preventDefault();
    let hasheada = await bcrypt.compare(
      input.contraseñaActual,
      detalleUser.contrasena
    );
    if (!hasheada) {
      return alert ("contraseña actual incorrecta");
    }

    //Si no hay errores, el isSubmit esta en true
    if (isSubmit) {
      dispatch(putUsuario(input, id));
      setInput({
        contraseñaActual: "",
        nuevaContraseña: "",
        repitaContraseña: "",
      });

      Toast.success("La contraseña ha sido cambiada", 1500, () => {
        navigate("/perfil");
      });
    } else {
      Toast.fail("No se ha podido actualizar la contraseña", 1500, () => {});
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
    <div>
      <div className={stl.form}>
        <br></br>
        <br></br>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={stl.datosRegistro} key={params.id}>
            <div className={stl.label}>CONTRASEÑA ACTUAL: </div>
            <input
              className={stl.input}
              onChange={(e) => handleChange(e)}
              name="contraseñaActual"
              value={input.contraseñaActual}
            />
            {errors.contraseñaActual && (
              <p className={stl.err}>{errors.contraseñaActual}</p>
            )}
          </div>
          <br></br>

          <div className={stl.datosRegistro} key={params.id}>
            <div className={stl.label}>CONTRASEÑA NUEVA:</div>
            <input
              className={stl.input}
              onChange={(e) => handleChange(e)}
              name="nuevaContraseña"
              value={input.nuevaContraseña}
            />
            {errors.nuevaContraseña && (
              <p className={stl.err}>{errors.nuevaContraseña}</p>
            )}
          </div>
          <br></br>

          <div className={stl.datosRegistro} key={params.id}>
            <div className={stl.label}>REPITA CONTRASEÑA: </div>
            <input
              className={stl.input}
              onChange={(e) => handleChange(e)}
              name="repitaContraseña"
              value={input.repitaContraseña}
            />
            {errors.repitaContraseña && (
              <p className={stl.err}>{errors.repitaContraseña}</p>
            )}
          </div>
          <br></br>
          <br></br>
          {errors.campos && <p className={stl.err}>{errors.campos}</p>}
          <div>
            <button
              className={stl.botonActualizar}
              type="submit"
              disabled={isSubmit ? false : true}
            >
              CAMBIAR CONTRASEÑA
            </button>
            <br></br>
            <br></br>
          </div>
        </form>
      </div>
    </div>
  );
}
