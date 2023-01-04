import React from "react";
import { Link } from "react-router-dom";
import "./Post.css";


export default function Post({titulo, contenido, id, owner}) {
 

    return (
        <div className="posted">


                    <div>
                        <div>Post de : {owner}</div>
                        <br></br>
                    </div>
            
                    <div className="tituloPosted">
                        <div classname="inputPosted"type="text">{titulo}</div>
                    </div>
                    
                    <div className="contenidoContenedor">
                        <div className="postedContenido" type="textarea" resize="none">{contenido}</div>
                    </div>
                        
                    <Link to ={`/comentario/${id}`}> 
                <button className="botonComentar">Comentar</button>
                </Link>
        </div>
    )

}