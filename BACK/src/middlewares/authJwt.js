const jwt = require("jsonwebtoken");
const roleModel = require("../modelos/roles");
const {SECRET} = process.env;
const UsuarioModel = require('../modelos/usuarios')

const verifyToken = async (req,res,next) =>{
    try {
        const token = req.headers['token'];
    
        console.log(token);
        if (!token) return res.status(403).json({message: 'Token invalido'})
        const decoded = jwt.verify(token, SECRET );
        req.userId = decoded.id
        
        // console.log(decoded);
    
        const usuario = await UsuarioModel.findById(req.userId, {contrasena: 0})
        console.log(usuario);
        if (!usuario) return res.status(404).json({message: 'Usuario no encontrado'})
        next ()
        
    } catch (error) {
        return res.status(400).json({message: 'No autorizado'})        
    }
};

const isAdmin = async (req,res,next) =>{
    const usuario = await UsuarioModel.findById(req.userId)    
    const roles = await roleModel.find({_id: {$in: usuario.roles}}) 
    console.log(roles, 'lksdjlskjdflskj');

    for (let i = 0; i<roles.length; i++){
        if (roles[i].nombre === 'admin'){
            next()
            return;
        }
    }
    return res.status(403).json({message: 'Requiere ser ADMIN'})

    next();
}
module.exports = {verifyToken, isAdmin};
