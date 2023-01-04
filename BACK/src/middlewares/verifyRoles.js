const {todosLosRoles} = require('../modelos/roles');

const checkRoles = (req,res,next)=>{
    try {
        const {roles} = req.body
        if(roles){
            for(let i = 0; i< roles.length; i++){
                if (todosLosRoles === null){
                    res.status(400).json({
                        message: 'Rol inexistente'
                    })
    
                }
            }
        }
        next()
        
    } catch (error) {
        
        res.status(400).json('Rol Inexistente')
    }
}

module.exports = checkRoles;