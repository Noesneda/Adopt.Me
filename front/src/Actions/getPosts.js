import axios from "axios";
import { GET_POSTS } from ".";

export default function getPosts() {
    return async function (dispatch) {
        const result = await axios.get("/comentario");
        return dispatch({ type: GET_POSTS, payload: result.data})
    }
}