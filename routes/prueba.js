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
    var material1 = req.query.material1;
    var aleta1 = req.query.aleta1;

    var conjunto = req.query.conjunto;
    if(req.query.conjunto){
        var material2 = req.query.material2;
        var aleta2 = req.query.aleta2;
    }

    if(conjunto){
        var nuevaPrueba = new Prueba({
            conjunto: conjunto,
            titulo: titulo,
            descripcion: descripcion,
            carnet: carnet,
            fecha: fecha,

            material1:  material1,
            aleta1:aleta1,

            material2: material2,
            aleta2: aleta2
        });
    }else{
        var nuevaPrueba = new Prueba({
            conjunto: conjunto,
            titulo: titulo,
            descripcion: descripcion,
            carnet: carnet,
            fecha: fecha,
            material1:  material1,
            aleta1: aleta1
        });
    }
    console.log(nuevaPrueba);

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
            res.render("error404", {});
        }else {
            console.log(prueba);
            res.render('ControlTemperatura/leer', { title: 'Formulario de pruebas', p:prueba});
        }
    });
});

router.get('/obtener/:idp', function(req, res) {
    var pruebaid = req.params.idp;
    Prueba.getPruebaById(pruebaid, function (err, prueba) {
        if(err){
            res.render("error404", {});
        }else {
            console.log(prueba);
            res.send({ p:prueba});
        }
    });
});

router.post('/resultados', function (req, res) {
    var resultados = req.params.aleta1;
    var idp = req.params.idp;

})

module.exports = router;
