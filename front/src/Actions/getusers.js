import axios from "axios";
import { GET_USERS } from ".";

export default function getusers() {
    return async function (dispatch) {
      const result = await axios.get("/usuarios");
      return dispatch({ type: GET_USERS, payload: result });
    };
  }
  