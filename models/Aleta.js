/**
 * Created by khris on 11-22-16.
 */
var moongose = require('mongoose');

//esquema de moongose
var AletaSchema = moongose.Schema({
    //propiedades o atributos
    forma:{type: String},
    descripcion:{type: Number},
    es_conjunto:{type: Boolean}
});

var Aleta = module.exports=moongose.model('Aleta', AletaSchema);

module.exports.getAletas = function (callback) {
    Aleta.find(callback);
}

module.exports.crearAleta = function (aleta, callback) {
    aleta.save(callback);
}