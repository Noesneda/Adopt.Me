import axios from 'axios';
import {GET_TAMAÑO_PERDIDOS} from '.';

export default function getTamañoPerdidos() {
    return async function (dispatch) {       
      const tamaño = await axios.get("/animalesPerdidos/tama/");
      return dispatch({ type: GET_TAMAÑO_PERDIDOS, payload: tamaño.data});
    };
  }