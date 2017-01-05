/**
 * Created by khris on 11-23-16.
 */
var moongose = require('mongoose');

//esquema de moongose
var ConfiguracionSchema = moongose.Schema({
    //propiedades o atributos
    tiempo:{ type: Number, default: 5000, min: 0}
});

var Configuracion = module.exports=moongose.model('Configuracion', ConfiguracionSchema);

module.exports.setTiempo = function (tiempo, id, callback) {
    var condicion = { _id : id };
    var update = { $set: {
        tiempo: tiempo
    }};
    var opciones = { upsert: true };
    Configuracion.update( condicion, update, opciones, callback);
}

module.exports.guardarTiempo = function (config, callback) {
    Configuracion.remove({}, function (err) {
        if(err){
            console.log("error al eliminar el tiempo");
        }else{
            config.save(callback);
        }
    })
}

module.exports.getTiempo = function (callback) {
    Configuracion.find(callback);
}