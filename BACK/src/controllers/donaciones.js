const donacionesModel = require("../modelos/donacionesModel");
const donaciones = {};

postDonaciones = async (req, res) => {
    try {
      const { donacion } = req.body;
      console.log();
  
      const dona = await new donacionesModel({
        donacion,
      });
      if (dona.length) await dona.save();
      const newDona = await dona.save();
      res.status(200).json(newDona);
    } catch (error) {
      res.status(400).json({ msg: "No se pudo realizar la donacion" });
    }
  };
  getDonaciones = async (req, res) => {
    try {
        let donaciones = await donacionesModel.find({ donacio: { path: "" } });
        console.log(donaciones);
        console.log(donaciones);
        if (!donaciones.length) throw Error ('No hay donaciones')
        return await res.status(200).json(donaciones);
      } catch (error) {
        res.status(400).json("UPS! No se encontraron pagos");
      }
  };

  module.exports = donaciones;