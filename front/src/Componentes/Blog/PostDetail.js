import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import getComentarioId from "../../Actions/getPostbyId";
import "./PostDetail.css";
import NavBar from "../NavBar/NavBar";
import PostResponse from "./PostRespuesta";
import Footer from "../Footer/Footer";
import Toast from 'light-toast';
import createRespuesta from "../../Actions/createRespuesta";
import getRespuesta from "../../Actions/getRespuesta";
import getDetalleUsuario from "../../Actions/getDetalleUsuario";
import { useAuth0 } from "@auth0/auth0-react";
import createFavorito from "../../Actions/createFavorito";
import getFavoritos from "../../Actions/getFavorito";

export default function PostDetail() {

    const { id } = useParams()
    const dispatch = useDispatch()
    const postDetalles = useSelector((state) => state.postDetails)

   
        

       ////////////////////////////////////////////////////////////////////////////////////////
    
       const { user, isAuthenticated } = useAuth0();
    
       let _id = undefined;
       if (user) {
           const usuarioIdRaro = user.sub;
           _id = usuarioIdRaro.substring(6);
       }
       
       useEffect(() => {
           dispatch(getDetalleUsuario(_id));
       }, [_id, dispatch]);
       
       
       const detalleUser = useSelector((state) => state.detalleUsuario); 
       const detalleUserGoogle = useSelector((state) => state.detalleUsuarioGoogle);
   
     function onClick(e) {
       e.preventDefault();
       if (!user) {
         return Toast.fail(
           "Debes iniciar sesion para responder este Post",
           1500,
           () => {}
         );
       }
       if ((user && detalleUser.usuario) || detalleUserGoogle.usuario) {
        e.preventDefault()

        dispatch(createRespuesta(input));
        dispatch(getRespuesta())
       setInput({
            respuesta: "",
            caquina: postDetalles._id,
            respuestaOwner: ""
        })
       
        Toast.success("Respuesta enviada con exito", 1000, () => {})
         }
      
     }
   
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

     function handleSubmit(e) {
        e.preventDefault()

        dispatch(createRespuesta(input));
        dispatch(getRespuesta())
       setInput({
            respuesta: "",
            caquina: postDetalles._id,
            respuestaOwner: detalleUser.nombre
        })
       
        Toast.success("Respuesta enviada con exito", 1000, () => {})
    }

     function handleRespuesta(e) {
       setInput({
            ...input,
            respuesta: e.target.value,
            caquina: postDetalles._id,
            respuestaOwner: detalleUser.nombre
        })
    }

    useEffect(() => {
        dispatch(getComentarioId(id))  
        window.scrollTo(0,0); 
    }, [id, dispatch])

    const [input, setInput] = useState({
        respuesta: "",
        caquina: postDetalles._id,
        respuestaOwner: detalleUser.nombre
    })

    ///////////////////////////////////////////////////////// RESPUESTAS //////////////////////////////////////////
    
    useEffect(() => {
        dispatch(getRespuesta())
    }, [dispatch])
    
    const allRespuestas = useSelector((state) => state.respuestas);
   
    const algo3 = allRespuestas.filter(({ caquina }) => caquina === postDetalles._id)


    ///////////////////////////////////////////////////////// AGREGAR A FAVORITOS //////////////////////////////////////////

    const fafafa = useSelector((state) => state.favoritos)
    const favorara = fafafa.map(({ favoritos }) => favoritos)
   
    useEffect(() => {
        dispatch(getFavoritos())
    }, [dispatch])

    const favo = postDetalles._id  
   
    const [fav, setFav] = useState({
        favoritos: "",
        userFav: "",
        nombre: ""
    })

    useEffect(() => {
        setFav({ favoritos: postDetalles._id,
                userFav: detalleUser._id,
                nombre: postDetalles.titulo})
        }, [postDetalles, detalleUser])
    
    function handleFavoritos(e) {
        if (!user) {
            return Toast.fail(
              "Debes iniciar sesion para agregar a Favoritos",
              1500,
              () => {}
            );
          }
        if ((user && detalleUser.usuario) || detalleUserGoogle.usuario) {
            e.preventDefault()
            
            if (favorara.includes(favo)) {
                Toast.fail("Ya tienes agregado este post en Mis Favoritos", 1000, () => {})
            } else { 
                dispatch(createFavorito(fav))
                setFav({
                    favoritos: postDetalles._id,
                    userFav: detalleUser._id,
                    nombre: postDetalles.titulo
                })
                Toast.success("Agregado a Mis Favoritos", 1000, () => {})

            }}
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="pagina">
        <NavBar />
        <div className="paginaDetalles" >

             <div className="posteoDetalles">

                <div className="botonfavoritos" onClick={handleFavoritos}>Fav</div><br></br>

                <div>Post creado por: {postDetalles.owner}</div>

            <div className="tituloDetalles"><div>{postDetalles.titulo}</div></div>

             <div className="textDetalles"><div className="detallescontenido">{postDetalles.contenido}</div></div>

            </div>
            
            <div className="postResponse">
                 
                {algo3 && algo3.map(r => {

                    return ( 

                        <PostResponse 
                        id = {r._id}
                        respuesta = {r.respuesta}
                        respuestaOwner ={r.respuestaOwner}
                        />

                    )
                })} 

            </div>

            
            <form className="contenedorRespuesta" onSubmit={handleSubmit}>

                <div>
                <div>Tu Comentario: </div>
                <div >
                    <textarea className="textRespuesta" id={postDetalles._id}  type="textarea" resize="none" name="respuesta"
                    value={input.respuesta} onChange={handleRespuesta} />
                    </div>
                </div>

                <button className="botonRespuesta" type="submit" onClick={onClick}>Enviar</button>
                </form>
            </div>

        <Footer />
        </div>
    )
}
