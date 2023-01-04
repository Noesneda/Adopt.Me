import {GET_CAT_EDAD} from ".";

export default function getCatEdad(payload){
    return {
        type: GET_CAT_EDAD,
        payload
    }
}