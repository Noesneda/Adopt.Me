const likeModel = require("../modelos/likeModel");
const likes = {};

getLike = async (req, res) => {
  try {
    let lik = await likeModel.find();
    console.log("likes", lik)
    res.status(200).json(lik);
  } catch (error) {
    res.status(400).json({ msg: "No se pudo obtener el Like" });
  }
};

postLike = async (req, res) => {
  try {
    const { likes } = req.body;
    const like = await new likeModel({
     likes
    });
    console.log("likes", like)
    if (like.length) await like.save();
    const nuevoLike = await like.save();
    res.status(200).json(nuevoLike);
  } catch (error) {
    res.status(400).json({ msg: "No se pudo guardar el Like" });
  }
};

deleteLike = async (req, res) => {
  const { id } = req.params; 
  try {
    await likeModel.remove({ _id: id });
    res.status(200).json(`el like  ${id} fue eliminado con exito`);
  } catch (error) {
    res.status(400).json(`el like ${id} no se pudo eliminar`);
  }
};

module.exports = likes;
