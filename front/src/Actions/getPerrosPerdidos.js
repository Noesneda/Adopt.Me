import axios from 'axios';
import {GET_PERRO_PERDIDO} from '.';

export default function getPerroPerdido() {
    return async function (dispatch) {
      const perros = await axios.get("/animalesPerdidos/perro");
      
      return dispatch({ type: GET_PERRO_PERDIDO, payload: perros.data });
    };
  }