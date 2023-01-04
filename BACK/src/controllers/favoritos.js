const favoritosModel = require("../modelos/favoritosModel");
const favoritosInfo = {};

postFavoritos = async (req, res) => {
  try {
    const { favoritos, userFav, nombre } = req.body;

    const favo = await new favoritosModel({
      favoritos,
      userFav,
      nombre
    });
    if (favo.length) await favo.save();
    const newFav = await favo.save();
    res.status(200).json(newFav);
  } catch (error) {
    res.status(400).json({ msg: "No se pudo crear Fav" });
  }
};

getFavoritos = async (req, res) => {
  try {
    let favoritos = await favoritosModel.find();
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(400).json({ msg: "No se encontro el Fav" });
  }
};


module.exports = favoritosInfo;