import {ORDEN_GATO} from '.';

export default function ordenAlfaGato(payload) {
    return { 
        type: ORDEN_GATO,
        payload
    }   
}