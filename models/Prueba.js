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
    material:[{
        material_id:{type:[moongose.Schema.Types.ObjectId]},
    }],
    aleta:[{
        aleta_id:{type:[moongose.Schema.Types.ObjectId]},
    }]
});

var Prueba = module.exports=moongose.model('Prueba', PruebaSchema);

module.exports.createPrueba = function (prueba, callback) {
    prueba.save(callback);
}

module.exports.getPruebaById = function (id, callback) {
    Prueba.findById(id, callback);
}

module.exports.realizarPruebaById = function(id, callback){
    Prueba.update({ _id: id }, { realizada: true}, {}, callback );
}
/*
PruebaSchema.findById(idprueba,function(err, prueba) {
    if(err) throw err;
    console.log(prueba);
});*/