import axios from "axios";

export default function signinUser(payload) {
  
  return async function (dispatch) {
    const result = await axios.post(
      "/usuarios/signin",
      payload
    );
    return dispatch({ type: "signin", payload: result.data });
  };
}
