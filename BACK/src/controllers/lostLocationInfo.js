const lostLocationModel = require("../modelos/lostAnimalLocation");
const infoLostLocation = {};

getLostLocation = async (req, res) => {
  try {
    let lostLocations = await lostLocationModel.find();
    res.status(200).json(lostLocations);
  } catch (error) {
    res.status(400).json({ msg: "no se encontró la locación" });
  }
};

postLostLocation = async (req, res) => {
  try {
    const { lng, lat } = req.body;

    const lostLocations = await new lostLocationModel({
      lng,
      lat
    });
    if (lostLocations.length) await lostLocations.save();
    const nuevaLostLocation = await lostLocations.save();
    res.status(200).json(nuevaLostLocation);
  } catch (error) {
    res.status(400).json({ msg: "no se registro la locación" });
  }
};

// deleteLostLocation = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await lostLocationModel.remove({ _id: id });
//     res.status(200).json(`ubicacion eliminada ${id} eliminación exitosa`);
//   } catch (error) {
//     res.status(400).json(`la ubicacion ${id} no se pudo eliminar`);
//   }
// };

module.exports = infoLostLocation;
