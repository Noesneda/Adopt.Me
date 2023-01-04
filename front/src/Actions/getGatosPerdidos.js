import axios from 'axios';
import {GET_GATO_PERDIDO} from '.';

export default function getGatoPerdido() {
    return async function (dispatch) {
      const gatos = await axios.get("/animalesPerdidos/gato");
      return dispatch({ type: GET_GATO_PERDIDO, payload: gatos.data });
    };
  }