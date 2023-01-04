const respuestaModel = require("../modelos/respuestaModel");
const infoBlog = {};

postRespuesta = async (req, res) => {
  try {
    const { respuesta, caquina, respuestaOwner } = req.body;

    const respuestas = await new respuestaModel({
      respuesta,
      caquina,
      respuestaOwner,
    });
    if (respuestas.length) await respuestas.save();
    const nuevaRespuesta = await respuestas.save();
    res.status(200).json(nuevaRespuesta);
  } catch (error) {
    res.status(400).json({ msg: "no se guardo respuesta" });
  }
};

getRespuesta = async (req, res) => {
  try {
    let respuesta = await respuestaModel.find();
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(400).json({ msg: "no se puede mostrar respuesta" });
  }
};

putRespuesta = async (req, res) => {
  const { id } = req.params;
  const { respuesta } = req.body;
  try {
    let respuesta = await respuestaModel.updateOne(
      { _id: id },
      {
        $set: {
          respuesta,
        },
      }
    );
    if (respuesta) {
      res.status(200).json(respuesta2);
    } else {
      res.status(400).json({ msg: "no puede modificar su respuesta" });
    }
  } catch (error) {
    console.log(error);
  }
};

deleteRespuesta = async (req, res) => {
  const { id } = req.params;
  try {
    await respuestaModel.remove({ _id: id });
    res.status(200).json(`la respuesta fue ${id} eliminado con exito`);
  } catch (error) {
    res.status(400).json(`la respuesta ${id} no se pudo eliminar`);
  }
};

module.exports = infoBlog;
