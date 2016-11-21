/**
 * Created by khris on 11-13-16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('ControlTemperatura/crear', { title: 'Formulario de pruebas' });
});

module.exports = router;
