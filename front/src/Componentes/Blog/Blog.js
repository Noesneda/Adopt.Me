import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Post from "./Post";
import "./Blog.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from 'light-toast';
import createPost from "../../Actions/createPost";
import getPosts from "../../Actions/getPosts";
import getDetalleUsuario from "../../Actions/getDetalleUsuario";
import { useAuth0 } from "@auth0/auth0-react";

export default function Blog() {
    
    const dispatch = useDispatch();

   
        
    
    /////////////////////// TRAIGO LOS POSTEOS //////////////////////////////////////////7
    
    const allPosts = useSelector((state) => state.posts);
    
    useEffect(() => {
        dispatch(getPosts())
        window.scrollTo(0,0);
    }, [dispatch])
    
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
        "Debes iniciar sesion para poder crear un Post",
        1500,
        () => {}
      );
    }
    if ((user && detalleUser.usuario) || detalleUserGoogle.usuario) {
        e.preventDefault()

        dispatch(createPost(input));
        dispatch(getPosts());
        setInput({
            titulo: "",
            contenido: "",
            owner: detalleUser.nombre
        })
        Toast.success("Post creado con exito", 1000, () => {})
      }
  }

    ///////////////////////////// CREO LOS POSTS ////////////////////////////////////////////

    const [input, setInput] = useState({
        titulo: "",
        contenido: "",
        owner: detalleUser.nombre
    })

    function handleTitulo(e) {
        setInput({
            ...input,
            titulo: e.target.value
        })
    }

    function handleContenido(e) {
        setInput({
            ...input,
            contenido: e.target.value
        })
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="foro">
        <NavBar />
        
        <div className="creadorContainer">
            
        <div className="createPost">
        <div className="tituloForo">Foro Adopt.Me</div>
        <div className="post">
  
         <form >
            
            <div className="posteo">

            <div className="tituloPost">  
            <div><br></br></div>
                <input classname="inputPost" type="text" name="titulo" value={input.titulo} onChange={handleTitulo}/>
                <div>Titulo</div>
            </div>

            <div>
                <textarea className="postContenido" type="textarea" resize="none" name="contenido" 
                value={input.contenido} onChange={handleContenido} />
                <div>Tu Consulta</div>
            </div>
            </div>

            <button className="botonPost" type="submit" onClick={onClick}>Enviar</button>

        </form>
        
            </div>
         </div>
          </div>

          <div className="posteos">

            {allPosts && allPosts.map(p => {

                return (

                    <Post
                    id = {p._id} 
                    titulo = {p.titulo}
                    contenido = {p.contenido}
                    owner = {p.owner}
                    />
                 
                )
            })}
          </div>

          <Footer />
     </div>
)

}