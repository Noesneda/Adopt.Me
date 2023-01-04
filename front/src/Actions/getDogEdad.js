import {GET_DOG_EDAD} from ".";

export default function getDogEdad(payload){
    return {
        type: GET_DOG_EDAD,
        payload
    }
}