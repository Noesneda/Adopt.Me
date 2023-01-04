const AnimalModel = require("../modelos/animales");
const infoAnimal = {};

getAnimales = async (req, res) => {
  try {
    let animales1 = await AnimalModel.find();
    res.status(200).json(animales1);
  } catch (error) {
    res.status(400).json({ msg: "no se encontró nada" });
  }
};

getPerros = async (req, res) => {
  try {
    let animalitos = await AnimalModel.find({ perro: true });
    console.log(animalitos);
    if (animalitos.length) await res.status(200).json(animalitos);
  } catch (error) {
    res.status(400).json("UPS! no se encontraron perritos");
  }
};

getGatos = async (req, res) => {
  try {
    let animalitos1 = await AnimalModel.find({ gato: true });
    console.log(animalitos1);
    if (animalitos1.length) await res.status(200).json(animalitos1);
  } catch (error) {
    res.status(400).json("UPS! No se encontraron gatitos");
  }
};

getPerrosByName = async (req, res) => {
  try {
    const { nombre } = req.query;
    console.log({ nombre });
    let mascotaName = await AnimalModel.findOne({
      nombre: { $regex: nombre, $options: "i" },
    });
    console.log(mascotaName);
    if (mascotaName.length) await res.status(200).send(mascotaName);
  } catch (error) {
    res.status(400).json(`no encontrado`);
  }
};

getGatosByName = async (req, res) => {
  try {
    const { nombre } = req.query;
    console.log({ nombre });
    let gatoName = await AnimalModel.find({
      nombre: { $regex: nombre, $options: "i" },
    });
    console.log(gatoName);
    if (gatoName.length) await res.status(200).json(gatoName);
  } catch (error) {
    res.status(400).json(`no encontrado`);
  }
};

getLocalidad = async (req, res) => {
  try {
    const { localidad } = req.query;
    console.log(localidad);
    let ubicacion = await AnimalModel.find({
      localidad: { $regex: localidad, $options: "i" },
    });
    console.log(ubicacion);
    if (ubicacion.length) await res.status(200).json(ubicacion);
  } catch (error) {
    res.status(400).json("UPS! algo salio mal");
  }
};

getTamaño = async (req, res) => {
  try {
    const { tama } = req.body;
    let tamas = await AnimalModel.find({ tam: { path: "" } });
    const mapeado = await tamas.map((t) => t.tama);
    console.log(tamas);
    if (tamas) await res.status(200).json(mapeado);
  } catch (error) {
    res.status(400).json("UPS! algo salio mal");
  }
};
getEdad = async (req, res) => {
  try {
    const { edad } = req.body;
    let edades = await AnimalModel.find({ eda: { path: "" } });
    const mapeados = await edades.map((t) => t.edad);
    console.log(edades);
    if (edades) await res.status(200).json(mapeados);
  } catch (error) {
    res.status(400).json("UPS! algo salio mal");
  }
};

postAnimal = async (req, res) => {
  try {
    const {
      _id: _id,
      perro,
      gato,
      nombre,
      raza,
      edad,
      estado,
      tama,
      peso,
      descripcion,
      castrado,
      vacunado,
      desparasitado,
      imagen,
      pichina,
      lng,
      lat,
      adoptado
      } = req.body;

    const animales = await new AnimalModel({
      _id: _id,
      perro,
      gato,
      nombre,
      raza,
      edad,
      estado,
      tama,
      peso,
      descripcion,
      castrado,
      vacunado,
      desparasitado,
      imagen,
      pichina,
      lng,
      lat,
      adoptado    
      })    
      if (animales.length) await animales.save()
      const nuevoAnimal = await animales.save()      
      res.status(200).json(nuevoAnimal)      
    
  } catch (error) {
    res.status(400).json({ msg: "no se creó el posteo" });
  }
};

getDetalleAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    console.log({ id });
    let anmId = await AnimalModel.findById(id);
    console.log(anmId);
    res.status(200).send(anmId);
  } catch (error) {
    res.status(400).json(`no encontrado`);
  }
};

putAnimal = async (req, res) => {
  const { id } = req.params;
  const { adoptado, estado } = req.body;
  try {
    await AnimalModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {adoptado, estado},
      }
    );
  } catch (error) {
      res.status(400).send(error)
    } 
    const animal = await AnimalModel.findById(id)
    res.send(animal)
  }

deleteAnimal = async (req, res) => {
  const { id } = req.params;
  try {
    await AnimalModel.remove({ _id: id });
    res.status(200).json(`la mascota ${id} eliminado con exito`);
  } catch (error) {
    res.status(400).json(`la mascota ${id} no se pudo eliminar`);
  }
};

module.exports = infoAnimal;
