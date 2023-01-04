import {GET_CAT_TAMAÑOS} from ".";

export default function getCatTamaños(payload){
    return {
        type: GET_CAT_TAMAÑOS,
        payload
    }
}