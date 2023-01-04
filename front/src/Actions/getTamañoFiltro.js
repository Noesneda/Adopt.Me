import {GET_TAMAÑO_FILTRO} from ".";

export default function getTamañofiltro(payload){
    return {
        type: GET_TAMAÑO_FILTRO,
        payload
    }
}