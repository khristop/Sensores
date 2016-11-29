/**
 * Created by khristop on 11-21-16.
 */

var moongose = require('mongoose');

//esquema de moongose
var PruebaSchema = moongose.Schema({
    //propiedades o atributos
    titulo:{type: String},
    descripcion:{type: String},
    fecha:{type:[Date]},
    carnet:{type: String},
    realizada:{type:Boolean, default: false},
    conjunto:{type:Boolean, default:false},
    material1: {
        type: moongose.Schema.Types.ObjectId, ref: 'Material'
    },
    material2:{
        type:moongose.Schema.Types.ObjectId, ref:'Material'
    },
    aleta1:{
        type:moongose.Schema.Types.ObjectId, ref:'Aleta'
    },
    aleta2:{
        type:moongose.Schema.Types.ObjectId, ref:'Aleta'
    }
});

var Prueba = module.exports=moongose.model('Prueba', PruebaSchema);

module.exports.createPrueba = function (prueba, callback) {
    prueba.save(callback);
}

module.exports.getPruebaById = function (id, callback) {
    Prueba.findById(id, callback)
        .populate('material1').populate('material2').populate('aleta1').populate('aleta2');
}

module.exports.realizarPruebaById = function(id, callback){
    Prueba.update({ _id: id }, { realizada: true}, {}, callback );
}
