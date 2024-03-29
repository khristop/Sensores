/**
 * Created by khristop on 11-21-16.
 */

var moongose = require('mongoose');

//esquema de moongose
var PruebaSchema = moongose.Schema({
    //propiedades o atributos
    titulo:{type: String},
    descripcion:{type: String},
    fecha:{type:Date},
    carnet:{type: String},
    realizada:{type:Boolean, default: false},

    conjunto:{type:Boolean, default:false},

    aletaSimple:{
        estado:{ type: Boolean, default: false},
        material: {
            type: moongose.Schema.Types.ObjectId, ref: 'Material'
        },
        tipo:{
            type:moongose.Schema.Types.ObjectId, ref:'Aleta'
        }

    },
    aletaConjunto:{
        estado:{ type: Boolean, default: false},
        material: {
            type: moongose.Schema.Types.ObjectId, ref: 'Material'
        },
        tipo:{
            type:moongose.Schema.Types.ObjectId, ref:'Aleta'
        }
    },
    resultados: {
        type:moongose.Schema.Types.ObjectId, ref:'Resultado'
    }
});

var Prueba = module.exports=moongose.model('Prueba', PruebaSchema);

module.exports.createPrueba = function (prueba, callback) {
    prueba.save(callback);
}

module.exports.getPruebaById = function (id, callback) {
    var bandera = false;
    /*Prueba.findById(id, function (err, p) {
        if(p.realizada == true){

        }
    })*/
    Prueba.findById(id, callback)
        .populate('aletaSimple.material')
        .populate('aletaConjunto.material')
        .populate('aletaSimple.tipo')
        .populate('aletaConjunto.tipo')
        .populate('resultados');

}

module.exports.realizarPruebaById = function(id, idr,callback){
    Prueba.update({ _id: id }, { realizada: true, resultados:idr }, {}, callback );
}

module.exports.getPruebas = function (callback) {
    Prueba.find({}, callback);
}