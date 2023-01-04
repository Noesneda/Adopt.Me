import axios from "axios";
import { GET_PAGOS } from ".";

export default function getpagos() {
    return async function (dispatch) {
        const result = await axios.get("/donaciones/pagos")
        return dispatch({ type: GET_PAGOS, payload: result.data})
    }
}