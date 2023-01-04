import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import stl from "./MiInformacion.module.css";
import createuser from "../../Actions/createuser";
import getusers from "../../Actions/getusers";
import FloatingUI from "../Floating UI/FloatingUI";

import { useAuth0 } from "@auth0/auth0-react";
import getDetalleUsuario from "../../Actions/getDetalleUsuario";
import putUser from "../../Actions/putUsuario";

import Toast from "light-toast";

export default function MiInformacion(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Metodo de router que me redirige a la ruta que yo le diga
  const Allusers = useSelector((state) => state.users).data; // (o el estado global que usemos para guardar todos los usuarios)


  const id = props.datos._id;

  useEffect(() => {
    dispatch(getusers());
    window.scrollTo(0,0);
  }, [dispatch]);

  const [input, setInput] = useState({
    usuario: props.datos.usuario,
    nombre: props.datos.nombre,
    telefono: props.datos.telefono,
    mail: props.datos.mail,
    nacimiento: props.datos.nacimiento,
    localidad: props.datos.localidad,
    fotoPerfil: props.datos.fotoPerfil,
  });

  const [errors, setErrors] = useState({});
  const [isSubmit, setisSubmit] = useState(true);

  let noRepeatUser = undefined;
  let noRepeatMail = undefined;
  //Lo meto en un if pq me rompia el filter
  if (Allusers) {
    noRepeatUser = Allusers.filter((u) => u.usuario === input.usuario);
    noRepeatMail = Allusers.filter((u) => u.mail === input.mail);
  }

  console.log("no repetir mail");
  console.log(noRepeatMail);

  function validation(input) {
    let errors = {};

    if (!input.usuario) {
      errors.usuario = "Tenes que ingresar un nombre de usuario";
    }
    if (
      !/^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]{1,15}$/.test(input.usuario)
    ) {
      errors.usuario = "El nombre de usuario no es válido";
    }
    if (noRepeatUser.length && input.usuario !== props.datos.usuario) {
      errors.usuario = `El nombre de usuario ${input.usuario} no está disponible`;
    }

    if (!input.nombre) {
      errors.nombre = "Tenes que ingresar un nombre";
    } else if (!/^[a-z\s]+$/i.test(input.nombre)) {
      errors.nombre = "El nombre no es válido";
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

    if (!input.mail) {
      errors.mail = "Tenes que ingresar un e-mail";
    }
    if (!/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim.test(input.mail)) {
      errors.mail = "El e-mail no es válido";
    }
    if (noRepeatMail.length && input.mail !== props.datos.mail) {
      errors.mail = "Ya existe una cuenta vinculada a ese mail";
    }

    if (!input.nacimiento) {
      errors.nacimiento = "Tenes que ingresar una fecha de nacimiento";
    }
    if (input.nacimiento.length > 10 || !/^[0-9-]+$/.test(input.nacimiento)) {
      errors.nacimiento = "Tenes  que ingresar una fecha válida (dd-mm-yyyy)";
    }

    if (!input.fotoPerfil || input.fotoPerfil === "") {
      setInput({
        fotoPerfil:
          "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
      });
    }

    if (!input.localidad) {
      errors.localidad = "Tenes que ingresar una localidad";
    }

    if (!input.fotoPerfil || input.fotoPerfil === "") {
      setInput({
        fotoPerfil:
          "https://res.cloudinary.com/dvw0vrnxp/image/upload/v1670012585/usuarios/userImageDefault_bm6bdk.png",
      });
    }

    if (Object.keys(errors).length === 0) {
      setisSubmit(true);
    }
    if (Object.keys(errors).length !== 0) {
      setisSubmit(false);
    }

    return errors;
  }
  console.log("este es el input");
  console.log(input);
  console.log("estos son los errors");
  console.log(errors);

  function handleSubmit(e) {
    e.preventDefault();
    if (noRepeatMail.length && input.mail !== props.datos.mail) {
      return alert(`El mail ingresado ${input.mail} ya esta en uso`);
    }
    if (noRepeatUser.length && input.usuario !== props.datos.usuario) {
      return alert(
        `El nombre de usuario ${input.usuario} ingresado ya esta en uso`
      );
    }
    //Si no hay errores, el isSubmit esta en true
    if (isSubmit) {
      console.log(
        "OK. Formulario recibido. Despacho la action con estos datos:"
      );
      console.log(input);
      dispatch(putUser(input, id));
      setInput({
        usuario: "",
        nombre: "",
        telefono: "",
        mail: "",
        nacimiento: "",
        localidad: "",
        fotoPerfil: "",
      });

      Toast.success("Usuario actualizado correctamente", 1500, () => {
        navigate("/homepage");
      });
    } else {
      Toast.fail("No se pudo actualizar los datos", 1500, () => {});
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

  function handleOpenWidget(e) {
    // console.log("Entre el handleOpenWidget");
    e.preventDefault();
    const imagen = document.querySelector("#user-photo");
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dvw0vrnxp",
        uploadPreset: "usuarios",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          // console.log('Done! Here is the image info: ', result.info);
          imagen.src = result.info.secure_url;
          setInput((prev) => ({
            ...prev,
            [e.target.name]: result.info.secure_url,
          }));
        }
      }
    );
    // console.log("abro el widget");
    myWidget.open();
  }

  return (
    <div>
      <div className={stl.form}>
        <br></br>
        <br></br>
        <form
          className={stl.formUser}
          onSubmit={(e) => handleSubmit(e)}
          action="/usuarios/signup"
          method="POST"
        >
          <br></br>
          <div className={stl.datosRegistro} key={params.id}>
            <img
              src={props.datos.fotoPerfil}
              id="user-photo"
              alt=""
              height="200"
              width="200"
            />
            <br></br>
            <button
              id="btn-foto"
              name="fotoPerfil"
              onClick={(e) => handleOpenWidget(e)}
              className={stl.buttons}
            >
              SELECCIONE FOTO DE PERFIL
            </button>
            <span></span>
            {errors.fotoPerfil && (
              <p className={stl.err}>{errors.fotoPerfil}</p>
            )}
          </div>
          <br></br>

          <div className={stl.datosRegistro} key={params.id}>
            <div className={stl.label}>NOMBRE DE USUARIO: </div>
            <input
              className={stl.input}
              type="text"
              name="usuario"
              value={input.usuario}
              onChange={(e) => handleChange(e)}
              placeholder={props.datos.usuario}
            />
            {errors.usuario && <p className={stl.err}>{errors.usuario}</p>}
          </div>
          <br></br>

          <div className={stl.datosRegistro} key={params.id}>
            <div className={stl.label}>NOMBRE Y APELLIDO / REFUGIO: </div>
            <input
              className={stl.input}
              type="text"
              required
              name="nombre"
              value={input.nombre}
              onChange={(e) => handleChange(e)}
              placeholder={props.datos.nombre}
            />
            {errors.nombre && <p className={stl.err}>{errors.nombre}</p>}
          </div>
          <br></br>

          <div className={stl.datosRegistro} key={params.id}>
            <div className={stl.label}>TELÉFONO DE CONTACTO: </div>
            <input
              className={stl.input}
              type="text"
              required
              name="telefono"
              value={input.telefono}
              onChange={(e) => handleChange(e)}
              placeholder={props.datos.telefono}
            />
            {errors.telefono && <p className={stl.err}>{errors.telefono}</p>}
          </div>
          <br></br>

          <div className={stl.datosRegistro} key={params.id}>
            <div className={stl.label}>E-MAIL: </div>
            <input
              className={stl.input}
              type="email"
              required
              name="mail"
              value={input.mail}
              onChange={(e) => handleChange(e)}
              placeholder={props.datos.mail}
            />
            {errors.mail && <p className={stl.err}>{errors.mail}</p>}
          </div>
          <br></br>

          <div className={stl.datosRegistro} key={params.id}>
            <div className={stl.label}>FECHA DE NACIMIENTO: </div>
            <input
              className={stl.input}
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
          </div>
          <br></br>

          <div className={stl.datosRegistro} key={params.id}>
            <div className={stl.label}>LOCALIDAD: </div>
            <input
              className={stl.input}
              type="text"
              required
              name="localidad"
              value={input.localidad}
              onChange={(e) => handleChange(e)}
              placeholder={props.datos.localidad}
            />
            {errors.localidad && <p className={stl.err}>{errors.localidad}</p>}
          </div>
          <br></br>
          <div>
            <br></br>
            <button
              className={stl.botonActualizar}
              type="submit"
              disabled={isSubmit ? false : true}
            >
              ACTUALIZAR DATOS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
