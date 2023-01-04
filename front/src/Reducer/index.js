import {
  CREATE_ANIMAL,
  CREATE_USER,
  GET_ANIMAL_BY_ID,
  GET_MASCOTAS,
  PAGO_MERCADO_PAGO,
  GET_USERS,
  GET_GATO,
  GET_PERRO,
  GET_DOG_LOCALIDAD,
  GET_CAT_LOCALIDAD,
  GET_ANIMALES_PERDIDOS,
  GET_TAMAÑO_FILTRO,
  GET_DETAIL_MASCOTA_PERDIDA,
  FILTRADO_ESTADO_PERDIDO,
  GET_GATO_PERDIDO,
  GET_PERRO_PERDIDO,
  CREATE_ANIMAL_PERDIDO,
  CREATE_LOCATION,
  GET_LOCATIONS,
  PAGO_STRIPES,
  GET_LOCATION_PERDIDOS,
  CREATE_LOCATION_PERDIDOS,
  GET_DOG_TAMAÑOS,
  GET_CAT_TAMAÑOS,
  GET_DOG_EDAD,
  GET_CAT_EDAD,
  CREATE_USER_GOOGLE,
  ORDEN_GATO,
  ORDEN_PERRO,
  CREATE_POST,
  GET_POSTS,
  GET_POST_ID,
  CREATE_RESPUESTA,
  GET_RESPUESTA,
  GET_LIKES,
  CREATE_LIKE,
  MAIL_VERIFICAR_USUARIO,
  EMAIL_INFO_ADOPTANTE,
  GET_FAVORITOS,
  CREATE_FAVORITO,
  // CREAR_USUARIO_VALIDADO,
  POST_PAYPAL,
  GET_PAGOS,
  DELETE_USER,
} from "../Actions";

const initialState = {
  animales: [],
  animalesdetail: [],

  perrosCopia: [],
  gatosCopia: [],

  detalleUsuarioSinValidar: [],
  detalleUsuarioGoogle: [],
  detalleUsuario: [],
  users: [],

  gatos: [],
  gatosPerdidos: [],

  perros: [],
  perrosPerdidos: [],

  tamañoFiltrado: [],
  edadFiltrado: [],

  animalesPerdidos: [],
  animalesPerdidosCopia: [],
  animalesPerdidosDetail: [],
  filtroPerdidos: [],

  locations: [],
  locationsPerdidos: [],

  posts: [],
  postDetails: [],
  copiaPosts: [],
  respuestas: [],

  edad: "edad",
  tamaño: "All",

  likes: [],
  favoritos: [],

  tamañoPerdidos: "All",
  estadoPerdidos: "estado",

  paypal: []
};

export default function rootReducer(state = initialState, action) {
  const gatos = state.gatos;
  const perros = state.perros;
  const animalesPerdidos = state.animalesPerdidos;

  switch (action.type) {
    case GET_MASCOTAS:
      if (action.payload) {
        return {
          ...state,
          animales: action.payload,
        };
      } else {
        return { ...state, animales: [] };
      }

    case CREATE_USER:
      return { ...state };

    case CREATE_POST:
      return { ...state };

    case CREATE_LIKE:
      return { ...state };

    case CREATE_RESPUESTA:
      return { ...state };

    case CREATE_FAVORITO:
      return { ...state };

    case CREATE_ANIMAL:
      return { ...state };

    case GET_ANIMAL_BY_ID:
      return { ...state, animalesdetail: action.payload };

    case GET_POST_ID:
      return { ...state, postDetails: action.payload };

    case GET_LIKES:
      return { ...state, 
        likes: action.payload 
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case GET_FAVORITOS:
      return {
        ...state,
        favoritos: action.payload,
      };

    case GET_RESPUESTA:
      return {
        ...state,
        respuestas: action.payload,
      };

    case GET_GATO:
      return {
        ...state,
        gatos: action.payload,
        gatosCopia: action.payload,
      };

    case GET_PERRO:
      return {
        ...state,
        perros: action.payload,
        perrosCopia: action.payload,
      };
    case GET_DOG_LOCALIDAD:
      return {
        ...state,
        perros: action.payload,
      };
    case GET_CAT_LOCALIDAD:
      return {
        ...state,
        gatos: action.payload,
      };

    case GET_PAGOS:
      return { 
        ...state, 
      paypal: action.payload,
      };

      case POST_PAYPAL:
        return {...state}

    case PAGO_MERCADO_PAGO:
      return { ...state };

    case PAGO_STRIPES:
      return { ...state };
    ///////////////////////////////////////////FILTROS///////////////////////////////////////////////////////////////////////
    case ORDEN_PERRO: {
      let sortedPerros = [];
      if (action.payload === "A-Z") {
        sortedPerros = [...state.perrosCopia].sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
      }
      if (action.payload === "Z-A") {
        sortedPerros = [...state.perrosCopia].sort((a, b) =>
          b.nombre.localeCompare(a.nombre)
        );
      }
      return {
        ...state,
        perrosCopia: sortedPerros,
      };
    }

    case ORDEN_GATO: {
      let sortedGatos = [];
      if (action.payload === "A-Z") {
        sortedGatos = [...state.gatosCopia].sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
      }
      if (action.payload === "Z-A") {
        sortedGatos = [...state.gatosCopia].sort((a, b) =>
          b.nombre.localeCompare(a.nombre)
        );
      }
      return {
        ...state,
        gatosCopia: sortedGatos,
      };
    }

    case GET_CAT_EDAD: {
      const filteredByTamaño =
        state.tamaño === "All"
          ? gatos
          : gatos.filter((g) => g.tama?.includes(state.tamaño));

      const filteredCats =
        action.payload === "edad" && filteredByTamaño.length
          ? filteredByTamaño
          : filteredByTamaño.filter((e) => e.edad?.includes(action.payload));

      return {
        ...state,
        gatosCopia: filteredCats,
        edad: action.payload,
      };
    }

    case GET_DOG_EDAD: {
      const filteredByTamaño =
        state.tamaño === "All"
          ? perros
          : perros.filter((p) => p.tama?.includes(state.tamaño));

      const filteredDogs =
        action.payload === "edad" && filteredByTamaño.length
          ? filteredByTamaño
          : filteredByTamaño.filter((e) => e.edad?.includes(action.payload));

      return {
        ...state,
        perrosCopia: filteredDogs,
        edad: action.payload,
      };
    }

    case GET_DOG_TAMAÑOS: {
      const filteredByEdad =
        state.edad === "edad"
          ? perros
          : perros.filter((p) => p.edad?.includes(state.edad));

      const filteredDogs =
        action.payload === "All" && filteredByEdad.length
          ? filteredByEdad
          : filteredByEdad.filter((e) => e.tama?.includes(action.payload));

      return {
        ...state,
        perrosCopia: filteredDogs,
        tamaño: action.payload,
      };
    }

    case GET_CAT_TAMAÑOS: {
      const filteredByEdad =
        state.edad === "edad"
          ? gatos
          : gatos.filter((p) => p.edad?.includes(state.edad));

      const filteredCats =
        action.payload === "All" && filteredByEdad.length
          ? filteredByEdad
          : filteredByEdad.filter((e) => e.tama?.includes(action.payload));

      return {
        ...state,
        gatosCopia: filteredCats,
        tamaño: action.payload,
      };
    }

    case GET_TAMAÑO_FILTRO: {
      const filteredByEstado =
        state.estadoPerdidos === "estado"
          ? animalesPerdidos
          : animalesPerdidos.filter((p) =>
              p.estado?.includes(state.estadoPerdidos)
            );

      const filteredPerdidos =
        action.payload === "All" && filteredByEstado.length
          ? filteredByEstado
          : filteredByEstado.filter((e) => e.tama?.includes(action.payload));

      return {
        ...state,
        animalesPerdidosCopia: filteredPerdidos,
        tamañoPerdidos: action.payload,
      };
    }

    case GET_DETAIL_MASCOTA_PERDIDA:
      return {
        ...state,
        animalesPerdidosDetail: action.payload,
      };

    case GET_ANIMALES_PERDIDOS:
      return {
        ...state,
        animalesPerdidos: action.payload,
        animalesPerdidosCopia: action.payload,
      };

    case FILTRADO_ESTADO_PERDIDO: {
      const filteredByTamaño =
        state.tamañoPerdidos === "All"
          ? animalesPerdidos
          : animalesPerdidos.filter((p) =>
              p.tama?.includes(state.tamañoPerdidos)
            );

      const filteredPerdidos =
        action.payload === "estado" && filteredByTamaño.length
          ? filteredByTamaño
          : filteredByTamaño.filter((e) => e.estado?.includes(action.payload));

      return {
        ...state,
        animalesPerdidosCopia: filteredPerdidos,
        estadoPerdidos: action.payload,
      };
    }

    case GET_GATO_PERDIDO:
      return {
        ...state,
        animalesPerdidosCopia: action.payload,
      };

    case GET_PERRO_PERDIDO:
      return {
        ...state,
        animalesPerdidosCopia: action.payload,
      };

    case CREATE_ANIMAL_PERDIDO:
      return {
        ...state,
      };

    //------------------------------------------Animales Perdidos Fin-----------------------------------------------------------------------//

    case "signin":
      return { ...state };

    case "getDetalleUsuario":
      return {
        ...state,
        detalleUsuario: action.payload,
      };

    case "getDetalleUsuarioSinValidar":
      return {
        ...state,
        detalleUsuarioSinValidar: action.payload,
      };

    case CREATE_LOCATION:
      return {
        ...state,
      };

    case GET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };

    case "putUsuario":
      return {
        ...state,
      };

    case "getDetalleUsuarioGoogle":
      return {
        ...state,
        detalleUsuarioGoogle: action.payload,
      };

    case CREATE_LOCATION_PERDIDOS:
      return {
        ...state,
      };

    case GET_LOCATION_PERDIDOS:
      return {
        ...state,
        locationsPerdidos: action.payload,
      };

    case CREATE_USER_GOOGLE:
      return {
        ...state,
      };

    case MAIL_VERIFICAR_USUARIO:
      return {
        ...state,
      };

    case EMAIL_INFO_ADOPTANTE:
      return {
        ...state,
      };


    case "postUsuario":
      return {
        ...state,
      };

      case DELETE_USER:
        return {
          ...state
        };


    default:
      return state;
  }
}
