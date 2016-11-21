/**
 * Created by khris on 11-13-16.
 */
var express = require('express');
var router = express.Router();

//models

var Prueba = require('../models/Prueba');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('ControlTemperatura/crear', { title: 'Formulario de pruebas' });
});

router.post('/crear', function (req, res) {
    var titulo = req.query.titulo;
    var descripcion = req.query.descripcion;
    var carnet = req.query.carnet;
    var fecha = req.query.fecha;

    //validar form
    /*req.checkQuery('titulo','titulo requerido');
    var errors = req.validationErrors();
    if(errors){
        res.send(errors):
    }else{}*/

    var nuevaPrueba = new Prueba({
        titulo: titulo,
        descripcion: descripcion,
        carnet: carnet,
        fecha: fecha
    });

    Prueba.createPrueba(nuevaPrueba, function (err, prueba) {
        if (err) throw err;
        console.log(prueba);
    })

})

module.exports = router;
