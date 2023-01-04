import axios from 'axios';
import { CREAR_USUARIO_VALIDADO } from '.';

export default function crearUsuarioValidado(payload) {
    console.log("entre a la action crearUsuarioValidado")
    return async function (dispatch){ const result = await axios.post("/usuarios/crearUsuarioValidado", payload); 
        return dispatch({ type: CREAR_USUARIO_VALIDADO, payload: result.data })                                                                                              
    }
}