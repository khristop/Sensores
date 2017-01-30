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

//aletas

router.get('/aleta/:ida', function (req, res) {
    var ida = req.params.ida;
    Aleta.getAletaById(ida, function (err, alet) {
        if(err){
            res.send("404");
        }else {
            res.send({
                status:"ok",
                aleta: alet
            });
        }
    });
})

router.post('/aleta/nuevo', function (req, res, next) {

    var forma = req.query.forma;
    var des = req.query.descripcion;

    var naleta = new Aleta({forma: forma,descripcion: des})
    Aleta.crearAleta(naleta, function (err, alet) {
        if(err) {throw err}
        else {
            res.send({
                status: "ok"
            })
        }
    })
})

router.post('/aleta/actualizar', function (req, res) {
    var forma = req.query.forma;
    var des = req.query.descripcion;
    var ida = req.query.ida;

    Aleta.actualizarAleta(ida, forma, des, function (err, alet) {
        if (err) {throw err}
        else{
            res.send({
                status:"ok"
            })
        }
    })
})

router.delete("/aleta/:ida", function (req, res) {
    var ida = req.params.ida;
    Aleta.eliminarAleta(ida, function (err) {
        if(err){throw err}
        else {
            res.send({
                status:"ok"
            })
        }
    })
})


//materiales

router.get('/material/:idm', function (req, res) {
    var idm = req.params.idm;
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

//obtener todo
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

//tiempo
router.get("/tiempo", function (req, res) {
    Configuracion.getTiempo(function (err, tiempo) {
        if(err){
            res.send({status:"tiempo aun no definido"});
        }else{
            res.send({t:tiempo[0],
                    status: "ok"});
        }
    } )

})

router.post('/tiempo', function (req, res) {
    var valor = req.query.tiempo;

    var config = new Configuracion({
        tiempo: valor
    })

    Configuracion.guardarTiempo(config, function (err, configu) {
        if (err) {throw err}
        else{
            res.send({
                status:"ok"
            })
        }
    })
})

module.exports = router;
