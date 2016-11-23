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