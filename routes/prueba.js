/**
 * Created by khris on 11-13-16.
 */
var express = require('express');
var router = express.Router();

//models

var Prueba = require('../models/Prueba');
var Resultado = require('../models/Resultado');
/* GET home page. */


router.get('/crear', function(req, res) {
    res.render('ControlTemperatura/crear', { title: 'Formulario de prueba nueva' });
});

router.post('/crear', function (req, res) {
    var titulo = req.query.titulo;
    var descripcion = req.query.descripcion;
    var carnet = req.query.carnet;
    var fecha = req.query.fecha;
    var conjunto = req.query.conjunto;

    var prueba = new Prueba({
        conjunto: conjunto,
        titulo: titulo,
        descripcion: descripcion,
        carnet: carnet,
        fecha: fecha
    });

    ale1 =JSON.parse(req.query.aletaSimple);
    if (ale1.estado){
        var material1 = ale1.material;
        var aleta1 = ale1.tipo;
        prueba.aletaSimple={
            estado:true,
            material: material1,
            tipo: aleta1
        }
    }

    ale2 =JSON.parse(req.query.aletaConjunto);
    if(ale2.estado){
        var material2 = ale2.material;
        var aleta2 = ale2.tipo;
        prueba.aletaConjunto={
            estado:true,
            material: material2,
            tipo: aleta2
        }
    }

    Prueba.createPrueba(prueba, function (err, prueba) {
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
            res.render('ControlTemperatura/leer', { title: 'Prueba', p:prueba});
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

router.post('/:idp', function (req, res) {
    var pruebaid = req.params.idp;
    var datos = JSON.stringify(req.query.resultados);
    console.log(datos.tiempo);
    if(datos.tiempo){
        var capturas= {};
        var sensores;
        for (i=0; i<datos.tiempo.length; i++){
            if(datos.aleta1){
                sensores = 1;
                for (sensor in datos.aleta1){
                    capturas.aleta1.push({
                        tiempo: datos.aleta1.tiempo,
                        valor: sensor[i],
                        sensor: 's'+sensores
                    });
                    sensores++;
                }
            }
        }
        console.log(capturas);
        var resultadoPrueba = new Resultado();
    }
    console.log(datos);
    res.send("ok");
});

module.exports = router;
