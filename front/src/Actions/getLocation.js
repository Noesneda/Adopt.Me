import axios from "axios";
import { GET_LOCATIONS } from ".";

export default function getLocations() {
    return async function (dispatch) {
        const result = await axios.get("/location");
        return dispatch({ type: GET_LOCATIONS, payload: result.data})
    }
}