import { useDispatch } from "react-redux";
import mailVerificarUsuario from "../../Actions/mailVerificarUsuario";
import stl from "./Cartelito.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function Cartelito({ input }) {
  console.log(input);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Metodo de router que me redirige a la ruta que yo le diga

  function handleOnClick(e) {
    dispatch(mailVerificarUsuario(input));
    navigate("/homepage");
  }

  return (
    <div>
      <div className={stl.Cartelito}>
        <br></br>
        <h1>
        Registro exitoso, por favor haz click en el boton de abajo para que te enviemos un mail de verificacion
        </h1>

        <button onClick={(e) => handleOnClick()} className={stl.boton}>
          VALIDAR
        </button>
      </div>
    </div>
  );
}
