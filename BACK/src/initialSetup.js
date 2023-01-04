const {roleModel }= require('../src/modelos/roles')

const createRoles = async ()=>{
try {
    const roles = await roleModel.estimatedDocumentCount()

    if(roles > 0) return;

    const tipoDeRoles = await Promise.all(
        [new roleModel({nombre: 'user'}).save(),
        new roleModel({nombre: 'admin'}).save()]
    )
    console.log(tipoDeRoles);
    
} catch (error) {
    res.status(404).json(error)
}
};

module.exports = createRoles;