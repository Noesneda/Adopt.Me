const mongoose = require("mongoose");
const { Schema } = mongoose;

const todosLosRoles = ['user', 'admin']

const roleSchema = new Schema(
    {
        nombre: String,
    },
    {
        versionKey: false,
    }
);

const roleModel = mongoose.model('roles', roleSchema);
module.exports = {roleModel, todosLosRoles};