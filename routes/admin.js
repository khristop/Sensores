/**
 * Created by khris on 11-23-16.
 */
/**
 * Created by khris on 11-13-16.
 */
var express = require('express');
var router = express.Router();

//models

var Aleta = require('../models/Aleta');
var Material = require('../models/Material');
var Configuracion = require('../models/Configuracion');

/* GET home page. */


router.get('/', function(req, res, next) {
    res.render('admin/admin', { title: 'Administracion' });
})


router.post('/aleta/nueva', function (req, res, next) {
    var nombre = req.query.nombre;
    var des = req.query.descripcion;

    var naleta = new Aleta({
        forma: nombre,
        descripcion: des,

    })
    res.send( {status:"ok"});
})


router.get('/material/:idm', function (req, res) {
    var idm = req.params.idm;
    console.log(idm);
    Material.getMaterialById(idm, function (err, materi) {
        if(err){
            res.send("404");
        }else {
            res.send({
                status:"ok",
                material: materi
            });
        }
    });
})

router.post('/material/nuevo', function (req, res, next) {
    var nombre = req.query.nombre;
    var des = req.query.descripcion;

    var mate = new Material({
        nombre: nombre,
        descripcion: des,
    })

    Material.crearMaterial(mate, function (err, mate) {
        if (err) {throw err}
        else{
            res.send({
                status:"ok"
            })
        }
    })
})


router.post('/material/actualizar', function (req, res) {
    var nombre = req.query.nombre;
    var des = req.query.descripcion;
    var idm = req.query.idmaterial;
    console.log(idm);
    Material.actualizar(nombre, des, idm, function (err, mate) {
        if (err) {throw err}
        else{
            res.send({
                status:"ok"
            })
        }
    })
})

router.delete("/material/:idm", function (req, res) {
    var idm = req.params.idm;
    Material.eliminar(idm, function (err) {
        if(err){throw err}
        else {
            res.send({
                status:"ok"
            })
        }
    })
})

router.get("/catalogo", function (req, res) {
    Aleta.getAletas(function (err, aletas) {
        if(err){
            res.send(err);
        }else {
            Material.getMateriales(function (error, materiales) {
                if(error){
                    res.send(error);
                }else{
                    res.send({"formas": aletas, "materiales": materiales});
                }
            })
        }
    })
})

module.exports = router;
