import axios from "axios";

export default function getDetalleUsuario(id) {
  return async function (dispatch) {
      const result = await axios.get(`/usuarios/${id}`);
      
    return dispatch({ type: "getDetalleUsuario", payload: result.data });
  };
}
