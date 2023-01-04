import axios from "axios";
import { GET_LIKES } from ".";

export default function getLikesFromBackend() {
    return async function (dispatch) {
        const result = await axios.get("/likes");
        console.log("action result", result)
        return dispatch({ type: GET_LIKES, payload: result.data})
    }
}