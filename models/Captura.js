/**
 * Created by khris on 11-22-16.
 */
var moongose = require('mongoose');

//esquema de moongose
var CapturaSchema = moongose.Schema({
    //propiedades o atributos
    momento:{type: Number},
    valor_medido:{type: Number},
    sensor:{type:String},
    material:[{
        material_id:{type:moongose.Schema.Types.ObjectId, ref:'Prueba'},
    }]
});

var Captura = module.exports=moongose.model('Captura', CapturaSchema);