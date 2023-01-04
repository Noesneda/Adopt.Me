import axios from "axios";
import { CREATE_POST } from ".";

export default function createPost(payload) {
    return async function (dispatch) {
        const result = await axios.post("/comentario", payload);
        return dispatch({ type: CREATE_POST, payload: result.data})
    }
}