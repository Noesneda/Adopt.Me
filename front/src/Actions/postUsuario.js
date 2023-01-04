import axios from 'axios';


export default function postUsuario(payload) {
  
    return async function (dispatch){ const result = await axios.post("/usuarios/postUsuario", payload); 
        return dispatch({ type: "postUsuario", payload: result.data })                                                                                                   
    }
}