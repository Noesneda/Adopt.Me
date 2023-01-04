const mongoose = require('mongoose');
const {Schema} = mongoose;

const AnimalSchema = new Schema({

    // _id: {
    //     type: String,
    //     require: true        
    // },    
    perro: {
        type: Boolean,
        require: true
    },
    gato:{
        type: Boolean,
        require: true
    },
    nombre: {
        type: String,
        required: true,
    },
    raza: {
        type: String,
        required: false,
    },
    edad: {
        type: Array,
        required: false,
    },
    estado: {
        type: String,
        required: false,
    },
    tama: {
        type: Array,
        required: false,
    },
    peso: {
        type: Number,
        required: false,
    },
    descripcion: {
        type: String,
        required: false,
    },
    castrado: {
        type: String,
        required: false,
    },
    vacunado: {
        type: String,
        required: false,
    },
    desparasitado: {
        type: String,
        required: false,
    },
    imagen: {
        type: String,
        required: false,
    },
    pichina: {
        // ref: 'usuarios',
        type: String,
    },    
    lat: {
        type: String,
        required: false,
    },
    lng: {
        type: String,
        required: false,
      },
    adoptado: {
        type: Boolean,
    }
});

const AnimalModel = mongoose.model('animales', AnimalSchema)
module.exports = AnimalModel;
//