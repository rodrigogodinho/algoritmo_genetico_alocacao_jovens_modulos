var express = require('express');
var router = express.Router();
var otimizacaoController = require('./../controllers/otimizacao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  otimizacaoController.executa(req, res);
});

module.exports = router;
