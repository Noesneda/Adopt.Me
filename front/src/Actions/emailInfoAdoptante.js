import axios from 'axios';
import { EMAIL_INFO_ADOPTANTE } from '.';

export default function emailInfoAdoptante(payload) {
    return async function (dispatch){ 
        const result = await axios.post("/usuarios/emailInfoAdoptante", payload); 
        return dispatch({ type: EMAIL_INFO_ADOPTANTE, payload: result.data })                                                                                         
    }
};