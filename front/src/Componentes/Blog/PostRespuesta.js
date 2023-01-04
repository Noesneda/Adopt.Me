import "./PostRespuesta.css"

export default function PostResponse({respuesta, respuestaOwner}) {

    return (
        <>
        <div className="contenedorRespuesta">


        <div className="respuesta">
            <br></br>
        <div>Respuesta de: {respuestaOwner} </div>
            <div className="textRespuesta" type="text"><div className="texto">{respuesta}</div></div>
        </div>

        </div>
        </>
    )
}