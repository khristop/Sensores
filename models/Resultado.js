/**
 * Created by khris on 11-22-16.
 */
var moongose = require('mongoose');

//esquema de moongose
var ResultadoSchema = moongose.Schema({
    //propiedades o atributos
    capturas:{
        aleta1:[{
            tiempo: {type:Number},
            valor: {type: Number},
            sensor: {type: String}
        }],
        aleta2:[{
            tiempo: {type:Number},
            valor: {type: Number},
            sensor: {type: String}
        }]
    }
});

var Resultado = module.exports=moongose.model('Resultado', ResultadoSchema);