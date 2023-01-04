const comentarioModel = require("../modelos/comentarioModel");
const infoBlog2 = {};

postComentario = async (req, res) => {
  try {
    const {
       _id: _id, 
       titulo, 
       contenido,
       owner,} = req.body;

    const comentarios = new comentarioModel({
      _id: _id, 
      titulo, 
      contenido,
      owner,
    });
    if (comentarios.length) await comentarios.save();
    const nuevoComentario = await comentarios.save();
    res.status(200).json(nuevoComentario);
  } catch (error) {
    res.status(400).json({ msg: "No se guardo comentario" });
  }
};

getComentario = async (req, res) => {
  try {
    let comentario = await comentarioModel.find();
   
    res.status(200).json(comentario);
    console.log("post", comentario)
  } catch (error) {
    res.status(400).json({ msg: "No se puede mostrar comentario" });
  }
};

getComentarioId = async (req, res) => {
  try {
    const { id } = req.params;
    let comId = await comentarioModel.findById(id);
    res.status(200).send(comId)
  } catch (error) {
    res.status(400).json("Post no encontrado")
  }
}

putComentario = async (req, res) => {
  const { id } = req.params;
  const { contenido } = req.body;
  try {
    let comentario = await comentarioModel.updateOne(
      { _id: id },
      {
        $set: {
          comentario,
        },
      }
    );
    if (comentario) {
      res.status(200).json(comentario);
    } else {
      res.status(400).json({ msg: "no puede modificar su comentario" });
    }
  } catch (error) {
    console.log(error);
  }
};

deleteComentario = async (req, res) => {
  const { id } = req.params;
  try {
    await comentarioModel.remove({ _id: id });
    res.status(200).json(`el comentario fue ${id} eliminado con exito`);
  } catch (error) {
    res.status(400).json(`el comentario ${id} no se pudo eliminar`);
  }
};

module.exports = infoBlog2;
