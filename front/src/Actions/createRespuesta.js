import axios from "axios";
import { CREATE_RESPUESTA } from ".";

export default function createRespuesta(payload) {
    return async function (dispatch) {
        const result = await axios.post("/respuesta", payload);
        return dispatch({ type: CREATE_RESPUESTA, payload: result.data})
    }
}