import axios from "axios";
import { CREATE_USER_GOOGLE } from ".";

export default function createUserGoogle(payload) {
  console.log("entre a la action createuser");
  return async function (dispatch) {
    const result = await axios.post("/usuarios/google/signup", payload);
    return dispatch({ type: CREATE_USER_GOOGLE, payload: result.data });
  };
}
