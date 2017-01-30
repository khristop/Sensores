/**
 * Created by khris on 11-13-16.
 */
var express = require('express');
var router = express.Router();

//models

var Prueba = require('../models/Prueba');
var Resultado = require('../models/Resultado');
/* GET home page. */

router.get('/', function (req, res) {
    res.render('ControlTemperatura/consultar', {
        title:'Consulta de pruebas'
    })
})

router.get('/lista', function (req, res) {
    Prueba.getPruebas(function (err, pruebas) {
        if(err){
            res.send({status:"No se encontraron pruebas"});
        }else{
            //console.log(pruebas);
            res.send({
                status:'ok',
                title: 'Consulta de pruebas',
                pruebas: pruebas});
        }
    })
})

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
            //console.log(prueba)
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
            res.send({ p:prueba});
        }
    });
});

router.post('/:idp', function (req, res) {
    var pruebaid = req.params.idp;
    var datos = JSON.parse(req.query.resultados);

    resu = new Resultado({

    });

    if(datos.aleta1){
        resu.aleta1 = datos.aleta1;
    }

    if(datos.aleta2){
        resu.aleta2= datos.aleta2;
    }
    Resultado.registrarResultados(resu, function (err, objeto) {
        if(err){
            res.send({status:"error al guardar resultados"});
        }else{
            Prueba.realizarPruebaById(pruebaid, objeto._id, function (err, pruRealizada) {
                if(err){
                    res.send({status:"error al vincular resultados"});
                }else{

                    res.send({status:"ok"});
                }
            })
        }
    })
});

module.exports = router;
