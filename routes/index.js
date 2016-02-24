var express = require('express');
var router = express.Router();

var modAluno1  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var modAluno2  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var modAluno3  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var modAluno4  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
var modAluno5  = [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var modAluno6  = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
var modAluno7  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0];
var modAluno8  = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var modAluno9  = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0];
var modAluno10 = [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var modAluno11 = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var modAluno12 = [0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0];
var modAluno13 = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0];
var modAluno14 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0];
var modAluno15 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var modAluno16 = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
var modAluno17 = [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0];
var modAluno18 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
var modAluno19 = [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
var modAluno20 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0];
var modAluno21 = [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var modAluno22 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0];
var modAluno23 = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0];
var modAluno24 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
var modAluno25 = [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0];
var modAluno26 = [0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var modAluno27 = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0];
var modAluno28 = [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
var modAluno29 = [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
var modAluno30 = [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0];
var modAluno31 = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0];
var modAluno32 = [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
var modAluno33 = [1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
var modAluno34 = [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1];
var modAluno35 = [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
var modAluno36 = [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
var modAluno37 = [0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
var modAluno38 = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0];
var modAluno39 = [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1];
var modAluno40 = [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0];
var modAluno41 = [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
var modAluno42 = [1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var modAluno43 = [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1];
var modAluno44 = [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
var modAluno45 = [1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0];
var modAluno46 = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0];
var modAluno47 = [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1];
var modAluno48 = [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
var modAluno49 = [1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0];
var modAluno50 = [0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0];
var modAluno51 = [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0];
var modAluno52 = [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0];
var modAluno53 = [1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0];
var modAluno54 = [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0];
var modAluno55 = [1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1];
var modAluno56 = [0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0];
var modAluno57 = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0];
var modAluno58 = [1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0];
var modAluno59 = [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1];
var modAluno60 = [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1];
var modAluno61 = [1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
var modAluno62 = [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1];
var modAluno63 = [1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var modAluno64 = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1];
var modAluno65 = [1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1];
var modAluno66 = [0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1];
var modAluno67 = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0];
var modAluno68 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1];
var modAluno69 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0];
var modAluno70 = [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

var salas = [{id:1, qtde:30}, {id:2, qtde:30}, {id:3, qtde:30}]

var retorno = [];

var geracao = 1;

const NUMERO_INDIVIDUOS = 400;
const TOTAL_DE_GERACOES = 50;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/teste', function(req, res, next) {
  geracao = 1;
  var populacao = criaPopulacao();
  for (var i = 0; i < TOTAL_DE_GERACOES; i++) {
    console.log('geracao atual: ' + geracao + ' - pontuacao max: ' + populacao.individuos[0].pontuacao);
    criaPopulacao(populacao);
    //if(populacao.individuos[0].pontuacao == 70){
    //  break;
    //}
  }
  var index = populacao.individuos.findIndex(function(item, i, arr){
    return (item.modulos[0] == 29 && item.modulos[1] == 7 && item.modulos[2] == 17
      || item.modulos[0] == 29 && item.modulos[1] == 17 && item.modulos[2] == 7
      || item.modulos[0] == 7 && item.modulos[1] == 29 && item.modulos[2] == 17
      || item.modulos[0] == 7 && item.modulos[1] == 17 && item.modulos[2] == 29
      || item.modulos[0] == 17 && item.modulos[1] == 29 && item.modulos[2] == 17
      || item.modulos[0] == 17 && item.modulos[1] == 17 && item.modulos[2] == 29);
  });
  console.log('Index da boa: ' + index );
  res.status(200).send(populacao);
});

function criaPopulacao(populacao){
  var novaPopulacao = {individuos:[]};
  if(populacao){
    var limite = populacao.individuos.length - 1;
    novaPopulacao = clone(populacao);
    /*
    for (var i = 0; i < limite; i+= 2) {
      crossOver(novaPopulacao.individuos[i], novaPopulacao.individuos[i+1]);
    }
    */
    var roleta = clone(novaPopulacao.individuos);
    var resultRoleta = [];
    do {
      ind1 = roleta.splice(random(roleta.length),1)[0];
      ind2 = roleta.splice(random(roleta.length),1)[0];
      crossOver(ind1, ind2);
      resultRoleta.push(ind1);
      resultRoleta.push(ind2);
    } while (roleta.length > 1);
    novaPopulacao.individuos = resultRoleta;

    for (var i = 0; i < populacao.individuos.length; i++) {
      ind = populacao.individuos[i];
      do {
        for (mod of ind.modulos) {
            if(Math.random() < 0.001){
              //console.log('X-Men na área - olha a mutação ai meu povo!!!');
              //console.log('Módulo antigo: ' + mod.id);
              mod.id = random(30);
              //console.log('Módulo x-men: ' + mod.id);
            }
        }
      } while (verificaIndividuoDuplicado(ind, i,populacao.individuos));
    }

    for (ind of novaPopulacao.individuos) {
      for (mod of ind.modulos) {
        mod.alunos = [];
      }
    }

    for (ind of novaPopulacao.individuos) {
      for (mod of ind.modulos) {
        alocaJovens(mod, ind)
      }
    }

    for (ind of novaPopulacao.individuos) {
      ind.pontuacao = funcaoObjeto(ind);
      ind.geracao = geracao;
      populacao.individuos.push(ind);
    }
    populacao.individuos.sort(function(a,b){
      return b.pontuacao - a.pontuacao
    });
    populacao.individuos.splice(NUMERO_INDIVIDUOS ,NUMERO_INDIVIDUOS);

  }else{
    for (var i = 0; i < NUMERO_INDIVIDUOS; i++) {
      var individuo = {modulos: [], pontuacao: 0, geracao: geracao};
      for (var j = 0; j < 3; j++) {
          criaModulo(individuo);
      }
      individuo.pontuacao = funcaoObjeto(individuo);
      novaPopulacao.individuos.push(individuo);
    }
    novaPopulacao.individuos.sort(function(a,b){
      return b.pontuacao - a.pontuacao
    });

  }
  geracao++;
  return novaPopulacao;
}

function crossOver(ind1, ind2){
  var tam = (ind1.modulos.length > ind2.modulos.length ? ind2.modulos.length : ind1.modulos.length) - 1;
  var modAux;
  for (var i = 0; i < tam; i++) {
    if(Math.random() > 0.35){
      modAux = ind1.modulos[i];
      ind1.modulos[i] = ind2.modulos[i];
      ind2.modulos[i] = modAux;
    }
  }
  modAux = ind1.modulos[tam];
  ind1.modulos[tam] = ind2.modulos[tam];
  ind2.modulos[tam] = modAux;
}

function criaModulo(individuo){
  var modulo = {id: 0, alunos:[], sala: {}};
  var modId = random(30)//Math.floor((Math.random() * 30));
  do {
    modId = random(30)//Math.floor((Math.random() * 30));
  } while (moduloNoIndividuo(individuo, modId));
  modulo.id = modId;
  for (var sala = 0; sala < salas.length; sala++) {
    if(!salaNoIndividuo(individuo, salas[sala].id)){
      modulo.sala = salas[sala];
      break;
    }
  }
  alocaJovens(modulo, individuo);
  individuo.modulos.push(modulo);
}

function alocaJovens(modulo, individuo){
  var limite = (modulo.sala.hasOwnProperty('qtde') ? modulo.sala.qtde : 70) -1;
  var randAux = Math.random();
  //if(randAux < 0.2){
  //  limite = Math.floor(limite * (1 - randAux));
  //}
  for (var i = 1; i < 71; i++) {
    var modAluno = eval('modAluno' + i);
    if(modAluno[modulo.id] == 0 ){
      if(!alunoNoIndividuo(individuo, i)){
        modulo.alunos.push(i);
        if(modulo.alunos.length > limite){
          break;
        }
      }
    }
  }
}

function moduloNoIndividuo(individuo, modId){
  for (var i = 0; i < individuo.modulos.length; i++) {
    if(individuo.modulos[i].id == modId){
      return true;
    }
  }
  return false;
}


function alunoNoIndividuo(individuo, alunoId){
  if(individuo.modulos){
    for (var i = 0; i < individuo.modulos.length; i++) {
      if(individuo.modulos[i] && individuo.modulos[i].hasOwnProperty('alunos')){
        for (var j = 0; j < individuo.modulos[i].alunos.length; j++) {
          if(individuo.modulos[i].alunos[j] == alunoId){
            return true;
          }
        }
      }
    }
  }
  return false;
}

function salaNoIndividuo(individuo, salaId){
  if(individuo.modulos){
    for (var i = 0; i < individuo.modulos.length; i++) {
      if(individuo.modulos[i] && individuo.modulos[i].hasOwnProperty('sala')){
        if(individuo.modulos[i].sala.id == salaId){
          return true;
        }
      }
    }
  }
  return false;
}

function verificaIndividuoDuplicado(individuo, indiceInd,individuos){
  var indice = individuos.findIndex(function(item, ind, arr){
    var ret = true;
    if(ind == indiceInd){
      ret = false;
    }else{
      for (var i = 0; i < item.modulos.length; i++) {
        if(item.modulos[i].id != individuo.modulos[i].id){
          ret = false;
          break;
        }
      }
    }

    return ret;
  });
  return indice > -1
}


function funcaoObjeto(individuo){
  var soma = 0;
  var modulos = [];
  for (mod of individuo.modulos) {
    soma += mod.alunos.length;
    if(modulos.indexOf(mod.id)){
      modulos.push(mod.id)
    }
  }
  if(soma == 70){
    soma += 10;
  }
  soma += modulos.length;
  var copia = clone(individuo.modulos);
  copia.sort(function(a, b){
    return a.alunos.length - b.alunos.length
  });
  soma += modulos.length + copia[0].alunos.length;
  return soma;
}

function clone(cloned){
  return JSON.parse(JSON.stringify(cloned));
}

function random(max){
  return Math.floor((Math.random() * max))
}

module.exports = router;
