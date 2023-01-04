import { Link, useParams, useNavigate, UNSAFE_NavigationContext } from "react-router-dom";
import React, { useState , useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import stl from "../FormSignIn/FormSignIn.module.css";
import signinUser from "../../Actions/signinUser";
import getusers from "../../Actions/getusers";
import FloatingUI from "../Floating UI/FloatingUI";
import Toast from 'light-toast';

export default function FormSignIn() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Metodo de router que me redirige a la ruta que yo le diga
  const Allusers = useSelector((state) => state.users).data; // (o el estado global que usemos para guardar todos los usuarios)

  window.onbeforeunload = function () {
    window.scrollTo(0,0);
};
    

  useEffect(() => {
    dispatch(getusers());
  }, [dispatch]);

  const [input, setInput] = useState({
    usuario: "",
    contraseña: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmit, setisSubmit] = useState(false);

  function validation(input) {
    let errors = {};
    let existUser = Allusers.filter((u) => u.usuario == input.usuario);


    ///////////////////////////////////////////////////////
    if (!input.usuario) {
      errors.usuario = "Tenes que ingresar un nombre de usuario";
    } else if (
      !/^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]{1,15}$/.test(input.usuario)
    ) {
      // max 15 caracteres alfanumericos
      errors.usuario = "El nombre de usuario no es válido";
    } 
    if (existUser.length === 0) {
      errors.usuario = "No encontramos ningun usuario con ese nombre";
    } 

    ///////////////////////////////////////////////////////////
    if (!input.contraseña) {
      errors.contraseña = "Tenes que ingresar una contraseña";
    } else if (/^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/.test(input.contraseña)) {
      errors.contraseña =
        "La contraseña debe tener mínimo 8 caracteres, al menos una letra y un número";
    }

    if (Object.keys(errors).length === 0) {
      setisSubmit(true);
    }
    return errors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isSubmit) { 
      dispatch(signinUser(input));
      setInput({
        usuario: "",
        contraseña: "",
      });
      Toast.success("Ingreso exitoso. Bienvenido", 1500, () => {
        navigate("/perfil");
      });
    } else {
      Toast.fail("No se pudo ingresar. Revise los campos", 1500, () => {});
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
      <NavBar />
      <FloatingUI />

      <div className={stl.form} key={params.id}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div key={params.id}>
            <label>NOMBRE DE USUARIO </label>
            <input
              type="text"
              required
              name="usuario"
              value={input.usuario}
              onChange={(e) => handleChange(e)}
            />{" "}
            <span></span>
            {errors.usuario && <p>{errors.usuario}</p>}
          </div>

          <div key={params.id}>
            <label>CONTRASEÑA </label>
            <input
              type="password"
              name="contraseña"
              value={input.contraseña}
              onChange={(e) => handleChange(e)}
            />{" "}
            <span></span>
            {errors.contraseña && <p>{errors.contraseña}</p>}
          </div>

          <button className={stl.buttons} type="submit" disabled={isSubmit? false : true}>
            ACEPTAR
          </button>
        </form>
      </div>

      <Link to="/homepage">
        <button className={stl.buttons}>CANCELAR</button>
      </Link>

      <Footer />
    </div>
  );
}
