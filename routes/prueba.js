/**
 * Created by khris on 11-13-16.
 */
var express = require('express');
var router = express.Router();

//models

var Prueba = require('../models/Prueba');

/* GET home page. */


router.get('/crear', function(req, res) {
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
        if (err) {throw err}
        else {
            console.log(prueba)
            res.send({
                status: "ok",
                id: prueba._id
            });
        };
    });
});

router.get('/:idp', function(req, res) {
    var pruebaid = req.params.idp;
    Prueba.getPruebaById(pruebaid, function (err, prueba) {
        if(err){
            res.send("Error 404, prueba no encontrada");
        }else {
            console.log(prueba);
            res.render('ControlTemperatura/leer', { title: 'Formulario de pruebas', p:prueba});
        }
    });

});

module.exports = router;
