/**
 * Created by khris on 11-13-16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('inicio/inicio', { title: 'Inicio Control Temperatura' });
});

module.exports = router;
