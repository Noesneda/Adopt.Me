import axios from "axios";
import { GET_LOCATION_PERDIDOS } from ".";

export default function getLocationsPerdidos() {
    return async function (dispatch) {
        const result = await axios.get("/lostlocation");
       
        return dispatch({ type: GET_LOCATION_PERDIDOS, payload: result.data})
    }
}