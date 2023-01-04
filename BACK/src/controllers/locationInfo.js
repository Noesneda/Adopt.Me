const locationModel = require("../modelos/locationModel");
const infoLocation = {};

getLocation = async (req, res) => {
  try {
    let locations = await locationModel.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(400).json({ msg: "no se encontró la locación" });
  }
};

postLocation = async (req, res) => {
  try {
    const { lng, lat } = req.body;

    const locations = await new locationModel({
      lng,
      lat,
    });
    if (locations.length) await locations.save();
    const nuevaLocation = await locations.save();
    res.status(200).json(nuevaLocation);
  } catch (error) {
    res.status(400).json({ msg: "no se registro la locación" });
  }
};

deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
    await locationModel.remove({ _id: id });
    res.status(200).json(`ubicacion eliminada ${id} eliminación exitosa`);
  } catch (error) {
    res.status(400).json(`la ubicacion ${id} no se pudo eliminar`);
  }
};

module.exports = infoLocation;
