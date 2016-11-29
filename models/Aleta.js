/**
 * Created by khris on 11-22-16.
 */
var moongose = require('mongoose');

//esquema de moongose
var AletaSchema = moongose.Schema({
    //propiedades o atributos
    forma:{type: String},
    descripcion:{type: String}
});

var Aleta = module.exports=moongose.model('Aleta', AletaSchema);

module.exports.getAletaById = function(id, callback){
    Aleta.findById(id, callback);
}

module.exports.getAletas = function (callback) {
    Aleta.find(callback);
}

module.exports.crearAleta = function (aleta, callback) {
    aleta.save(callback);
}

module.exports.actualizarAleta = function ( ida, forma, desc, callback) {
    var condicion = { _id: ida};
    var update = { $set:{
        forma: forma,
        descripcion: desc,
    }};

    var opciones = {upsert:true};
    Aleta.update(condicion , update, opciones, callback);
}

module.exports.eliminarAleta = function (ida, callback) {
    Aleta.findByIdAndRemove(ida, callback);
}