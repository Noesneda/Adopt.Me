const AnimalesPerdidosModel = require ('../modelos/animalesPerdidos');
const InfoAnimalesPerdidos = {};

getAnimalesPerdidos = async (req, res)=>{
    try {
        const todos = await AnimalesPerdidosModel.find()
        if (todos.length)return res.status(200).json(todos)
    } catch (error) {
        res.status(404).json('UPS! Algo salio mal')      
    }
};
getPerrosPerdidos = async (req,res) => {  
    try {
    let animalitos = await AnimalesPerdidosModel.find({perro: true});
    console.log(animalitos);           
    if(animalitos.length) 
    await res.status(200).json(animalitos)
  } catch (error) {
    res.status(400).json('UPS! no se encontraron perritos')    
  }
  } 
  getGatosPerdidos = async (req,res) => {
    try {
      let animalitos1 = await AnimalesPerdidosModel.find({gato: true});
      console.log(animalitos1);
      if(animalitos1.length)
      await res.status(200).json(animalitos1) 
    } catch (error) {
      res.status(400).json('UPS! No se encontraron gatitos')   
    }
  };   

  getTamañoPerdidos = async (req,res) => {
    try {
      
      const {tama} = req.body;      
      let mediano = await AnimalesPerdidosModel.find({tam:{path: ''}});    
      const mapeado = await mediano.map(t=>t.tama)
        
      if (mediano) await res.status(200).json(mapeado)
    } catch (error) {
      res.status(400).json('UPS! algo salio mal')   
    }
  };
  
  postAnimalesPerdidos = async (req, res) => {
    try {
      const {  
        _id: _id,    
        perro,
        gato,        
        edad,
        estado,
        tama,        
        descripcion,        
        imagen,
        lng,
        lat,
        adoptado} = req.body;
  
        const animales = await new AnimalesPerdidosModel({
        _id: _id,
        perro,
        gato,        
        edad,
        estado,
        tama,       
        descripcion,
        imagen, 
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
  
  getDetalleAnimalPerdido = async (req, res) => {
    try {
      const { id } = req.params;
      console.log({id});
      let anmId = await AnimalesPerdidosModel.findById(id); 
      console.log(anmId);
      res.status(200).send(anmId);
      
    } catch (error) {
      res.status(400).json(`no encontrado`);
    }
  };
  getEstadoAnimalPerdido = async (req,res)=>{
    try {
      const {estado} = req.body;             
      let estados = await AnimalesPerdidosModel.find({estad: {path: ''}});   
      console.log(estados);
      const mapeado = await estados.map(e=>e.estado);  
      if (estados) await res.status(200).json(mapeado);

    } catch (error) {
        res.status(400).json('UPS! algo salio mal')        
    }
  }


  putAnimalesPerdidos = async (req, res) => {
    const { id } = req.params;
    const { adoptado } = req.body;
    try {
      await AnimalesPerdidosModel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {adoptado},
        }
      );
    } catch (error) {
        res.status(400).send(error)
      } 
      const animal = await AnimalesPerdidosModel.findById(id)
      res.send(animal)
    }
 

module.exports = InfoAnimalesPerdidos;
