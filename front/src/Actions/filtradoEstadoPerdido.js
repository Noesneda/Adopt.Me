import {FILTRADO_ESTADO_PERDIDO} from ".";

export default function filtradoEstadoPerdido(payload){
    return {
        type: FILTRADO_ESTADO_PERDIDO,
        payload
    }
}