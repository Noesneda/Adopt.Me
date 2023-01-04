import axios from 'axios';
import {GET_CAT_LOCALIDAD} from '.';

export default function getCatsLocal(localidad) {
    return async function (dispatch) {
      const gatos = await axios.get(`/animales/localidad/?localidad=${localidad}`);
      return dispatch({ type: GET_CAT_LOCALIDAD, payload: gatos.data });
    };
  }