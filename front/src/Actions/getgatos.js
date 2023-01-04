import axios from 'axios';
import {GET_GATO} from '.';

export default function getgato() {
    return async function (dispatch) {
      const gatos = await axios.get("/animales/gato");
      return dispatch({ type: GET_GATO, payload: gatos.data });
    };
  }