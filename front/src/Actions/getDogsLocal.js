import axios from 'axios';
import {GET_DOG_LOCALIDAD} from '.';

export default function getDogsLocal(localidad) {
    return async function (dispatch) {
      const perros = await axios.get(`/animales/localidad/?localidad=${localidad}`);
      return dispatch({ type: GET_DOG_LOCALIDAD, payload: perros.data });
    };
  }