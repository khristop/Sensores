/**
 * Created by khris on 11-22-16.
 */
var moongose = require('mongoose');

//esquema de moongose
var MaterialSchema = moongose.Schema({
    //propiedades o atributos
    nombre:{type: String},
    descripcion:{type: String}
});

var Material = module.exports=moongose.model('Material', MaterialSchema);

module.exports.getMaterialById = function(id, callback){
    Material.findById(id, callback);
}

module.exports.getMateriales = function (callback) {
    Material.find(callback);
}

module.exports.crearMaterial = function (material, callback) {
    material.save(callback);
}

module.exports.actualizar = function(nombre, des, codi, callback){
    var condicion = { _id : codi };
    var update = { $set: {
        nombre: nombre,
        descripcion: des
    }};
    var opciones = { upsert: true };
    Material.update( condicion, update, opciones, callback);
}

module.exports.eliminar = function (idm, callback) {
    Material.findByIdAndRemove(idm, callback);
}