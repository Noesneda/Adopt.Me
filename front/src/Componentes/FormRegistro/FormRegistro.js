import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import stl from "../FormRegistro/FormRegistro.module.css";
import createuser from "../../Actions/createuser";
import getusers from "../../Actions/getusers";
// import mailVerificarUsuario from "../../Actions/mailVerificarUsuario"
import FloatingUI from "../Floating UI/FloatingUI";
import userImageDefault from "../../Imagenes/userImageDefault.png";
import Toast from "light-toast";
import Cartelito from "./Cartelito"

export default function FormRegistro() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Metodo de router que me redirige a la ruta que yo le diga
  const Allusers = useSelector((state) => state.users).data; // (o el estado global que usemos para guardar todos los usuarios)



  useEffect(() => {
    dispatch(getusers());
    window.scrollTo(0,0);
  }, [dispatch]);

  const [input, setInput] = useState({
    usuario: "",
    contrasena: "",
    repitaContrasena: "",
    nombre: "",
    telefono: "",
    mail: "",
    nacimiento: "",
    localidad: "",
    fotoPerfil: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const [cartelito, setCartelito] = useState(false);

  let noRepeatUser = undefined;
  let noRepeatMail = undefined;
  //Lo meto en un if pq me rompia el filter
  if (Allusers) {
    noRepeatUser = Allusers.filter((u) => u.usuario === input.usuario);
    noRepeatMail = Allusers.filter((u) => u.mail === input.mail);
  }

  function validation(input) {
    let errors = {};
    // let noRepeatUser = Allusers.filter((u) => u.usuario === input.usuario);
    // let noRepeatMail = Allusers.filter((u) => u.mail === input.mail);

    if (!input.usuario) {
      errors.usuario = "Tenes que ingresar un nombre de usuario";
    } else if (
      !/^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]{1,15}$/.test(input.usuario)
    ) {
      // max 15 caracteres alfanumericos
      errors.usuario = "El nombre de usuario no es válido";
    } else if (noRepeatUser.length) {
      errors.usuario = `El nombre de usuario ${input.usuario} no está disponible`;
    }

    if (!input.contrasena) {
      errors.contrasena = "Tenes que ingresar una contraseña";
    } else if (
      !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.contrasena)
    ) {
      errors.contrasena =
        "La contraseña debe tener entre 8 y 16 caracteres, al menos un número, al menos una minúscula y al menos una mayúscula.";
    }

    if (!input.repitaContrasena) {
      errors.repitaContraseña = "Tenes que repetir la contraseña";
    } else if (input.repitaContrasena !== input.contrasena) {
      errors.repitaContraseña = "Las contraseñas no coinciden";
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
      errors.telefono = "Este campo solo debe contener numeros"
    }
     if (input.telefono.length > 15) {
      errors.telefono = "El teléfono no es válido";
    }

    if (!input.mail) {
      errors.mail = "Tenes que ingresar un e-mail";
    } else if (!/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim.test(input.mail)) {
      errors.mail = "El e-mail no es válido";
    } else if (noRepeatMail.length) {
      errors.mail = "Ya existe una cuenta vinculada a ese mail";
    }

    if (!input.nacimiento) {
      errors.nacimiento = "Tenes que ingresar una fecha de nacimiento";
    } else if (
      input.nacimiento.length > 10 ||
      !/^[0-9-]+$/.test(input.nacimiento)
    ) {
      errors.nacimiento = "Tenes  que ingresar una fecha válida (dd-mm-yyyy)";
    }

    if (!input.fotoPerfil || input.fotoPerfil === "") {
      setInput({
        fotoPerfil:
        "https://res.cloudinary.com/dvw0vrnxp/image/upload/v1671058408/usuarios/avatarvacio_hcmos8.jpg",
      });
    }

    if (!input.localidad) {
      errors.localidad = "Tenes que ingresar una localidad";
    }

    if (Object.keys(errors).length === 0) {
      setisSubmit(true);
    }
    if (Object.keys(errors).length !== 0) {
      setisSubmit(false);
    }

    return errors;
  }

  console.log("Estos son los errores");
  console.log(errors);

  function handleSubmit(e) {
    e.preventDefault();
    if (noRepeatMail.length) {
      return alert(`El mail ingresado ${input.mail} ya esta en uso`);
    }
    if (noRepeatUser.length) {
      return alert(
        `El nombre de usuario ${input.usuario} ingresado ya esta en uso`
      );
    }
    //Si no hay errores, el isSubmit esta en true
    if (isSubmit) {
      // console.log("Se despacha el create con estos valores")
      // console.log(input)
     // dispatch(createuser(input));

      dispatch(createuser(input));

      setCartelito(true);

      // dispatch(mailVerificarUsuario(input));

      // dispatch(mailVerificarUsuario(input));
      
      // setInput({
      //   usuario: "",
      //   contrasena: "",
      //   repitaContrasena: "",
      //   nombre: "",
      //   telefono: "",
      //   mail: "",
      //   nacimiento: "",
      //   localidad: "",
      //   fotoPerfil: "",
      // });
      Toast.success("Usuario creado correctamente", 1500, () => {
       // navigate("/prueba");
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

  // function handleSend(e) {
  //   e.preventDefault();
  //   setSent(true);
  //   dispatch(emailConfirmacion(input.mail));
  //   console.log('input.mail', input.mail)
  // }

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
    <div className={stl.registro} key={params.id}>
      <NavBar />
      <FloatingUI />


      {cartelito ? <Cartelito input={input} /> :
        <div className={stl.form} key={params.id}>
          <div className={stl.titulomayor}>Registro de Usuario</div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            action="/usuarios/signup"
            method="POST"
          >
            <div className={stl.datosRegistro} key={params.id}>
              <img
                src={userImageDefault}
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
                className={stl.BotonFoto}
              >
                SELECCIONE FOTO DE PERFIL
              </button>
              <span></span>

            
              {errors.fotoPerfil && (<p className={stl.err}>{errors.fotoPerfil}</p>)}
            
            </div>
            <div className={stl.datosRegistro} key={params.id}>
              <div>NOMBRE DE USUARIO: </div>
              <input
                className={stl.inputs}
                type="text"
                pipo
                name="usuario"
                value={input.usuario}
                onChange={(e) => handleChange(e)}
              />{" "}
            
              {errors.usuario && <p className={stl.err}>{errors.usuario}</p>}
            
              <span></span>
            </div>

            <div className={stl.datosRegistro} key={params.id}>
              <div>CONTRASEÑA: </div>
              <input
                className={stl.inputs}
                required
                type="password"
                name="contrasena"
                value={input.contrasena}
                onChange={(e) => handleChange(e)}
              />{" "}
            
              {errors.contrasena && (
                <p className={stl.err}>{errors.contrasena}</p>
              )}
            
              <span></span>
            </div>

            <div className={stl.datosRegistro} key={params.id}>
              <div>REPITA CONTRASEÑA: </div>
              <input
                className={stl.inputs}
                required
                type="password"
                name="repitaContrasena"
                value={input.repitaContrasena}
                onChange={(e) => handleChange(e)}
              />{" "}
            
              {errors.repitaContraseña && (
                <p className={stl.err}>{errors.repitaContraseña}</p>
              )}
           
              <span></span>
            </div>

            <div className={stl.datosRegistro} key={params.id}>
              <div>NOMBRE Y APELLIDO / REFUGIO: </div>
              <input
                className={stl.inputs}
                type="text"
                required
                name="nombre"
                value={input.nombre}
                onChange={(e) => handleChange(e)}
              />
              {errors.nombre && <p className={stl.err}>{errors.nombre}</p>}
            </div>
            
            <div className={stl.datosRegistro} key={params.id}>
              <div>TELÉFONO DE CONTACTO: </div>
              <input
                className={stl.inputs}
                type="text"
                required
                name="telefono"
                value={input.telefono}
                onChange={(e) => handleChange(e)}
              />{" "}
            
              {errors.telefono && (
                <p className={stl.err}>{errors.telefono}</p>
              )}
            
              <span></span>
            </div>

            <div className={stl.datosRegistro} key={params.id}>
              <div>E-MAIL: </div>
              <input
                className={stl.inputs}
                type="email"
                required
                name="mail"
                value={input.mail}
                onChange={(e) => handleChange(e)}
              />{" "}
           
              {errors.mail && <p className={stl.err}>{errors.mail}</p>}
            
              <span></span>
            </div>

            <div className={stl.datosRegistro} key={params.id}>
              <div>FECHA DE NACIMIENTO: </div>
              <input
                className={stl.inputs}
                required
                type="date"
                name="nacimiento"
                value={input.nacimiento}
                placeholder="dd-mm-yyyy"
                onChange={(e) => handleChange(e)}
              />{" "}
           
              {errors.nacimiento && (
                <p className={stl.err}>{errors.nacimiento}</p>
              )}
           
              <span></span>
            </div>

            <div className={stl.datosRegistro} key={params.id}>
              <div>LOCALIDAD: </div>
              <input
                className={stl.inputs}
                type="text"
                required
                name="localidad"
                value={input.localidad}
                onChange={(e) => handleChange(e)}
              />{" "}
            
              {errors.localidad && (
                <p className={stl.err}>{errors.localidad}</p>
              )}
           

              <span></span>
            </div>

            <div>
              <button
                className={stl.buttons}
                type="submit"
                disabled={isSubmit ? false : true}
              >
                ACEPTAR
              </button>

              <Link to="/homepage">
                <button className={stl.buttons}>CANCELAR</button>
              </Link>
            </div>
          </form>

      

        </div>
      }

      <Footer />
    </div>
  );
}
