var express = require('express');
var router = express.Router();

const NUMERO_INDIVIDUOS = 400;
const TOTAL_DE_GERACOES = 250;
const TOTAL_DE_ALUNOS = 70;

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
  res.status(200).send(populacao);
});

function criaPopulacao(populacao){
  var novaPopulacao = {individuos:[]};
  if(populacao){
    var limite = populacao.individuos.length - 1;
    novaPopulacao = clone(populacao);
    //Inicio a roleta para encontrar os pais e gerar os filhos
    var roleta = clone(novaPopulacao.individuos);
    var resultRoleta = [];
    do {
      ind1 = roleta.splice(random(roleta.length),1)[0];
      ind2 = roleta.splice(random(roleta.length),1)[0];
      crossOver(ind1, ind2);
      //Mutação do filho 1
      for (mod of ind1.modulos) {
          if(Math.random() < 0.0007){
            mod.id = random(30);
          }
      }
      //Mutação do filho 2
      for (mod of ind2.modulos) {
          if(Math.random() < 0.0007){
            mod.id = random(30);
          }
      }
      resultRoleta.push(ind1);
      resultRoleta.push(ind2);
    } while (roleta.length > 1);
    novaPopulacao.individuos = resultRoleta;
    //Se gerou clone eu forço a mutação
    for (var i = 0; i < populacao.individuos.length; i++) {
      ind = populacao.individuos[i];
      do {
        for (mod of ind.modulos) {
            if(Math.random() < 0.01){
              mod.id = random(30);
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
      /*
      for (mod of ind.modulos) {
        alocaJovens(mod, ind)
      }
      */
      for (var i = 0; i < 4; i++) {
        for (mod of ind.modulos) {
          alocaJovens(mod, ind, random(10)/10);
        }
      }
      for (mod of ind.modulos) {
        alocaJovens(mod, ind, null);
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
      for (var j = 0; j < 4; j++) {
        for (mod of individuo.modulos) {
          alocaJovens(mod, individuo, random(10)/10);
        }
      }
      for (mod of individuo.modulos) {
        alocaJovens(mod, individuo, null);
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
  alocaJovens(modulo, individuo, 0.2);
  individuo.modulos.push(modulo);
}

function alocaJovens(modulo, individuo, taxaReducao){
  if(modulo.sala.qtde > modulo.alunos.length){
    var limite = (modulo.sala.hasOwnProperty('qtde') ? modulo.sala.qtde - modulo.alunos.length : TOTAL_DE_ALUNOS) -1;
    if(taxaReducao){
      limite = Math.floor(limite * taxaReducao);
    }
    for (var i = 1; i <= TOTAL_DE_ALUNOS ; i++) {
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
  var tamanhoMedioDaSala = 0;
  var qtdeMediaJovensNaSala = Math.floor(TOTAL_DE_ALUNOS/individuo.modulos.length);
  var fatorDePesoSecundario = 0;
  var qtdeMaiorSala = 0;
  for (mod of individuo.modulos) {
    soma += mod.alunos.length;
    //if(modulos.indexOf(mod.id) == -1){
    //  modulos.push(mod.id)
    //}
    fatorDePesoSecundario += Math.abs(qtdeMediaJovensNaSala - mod.alunos.length);
    if(mod.sala.qtde > qtdeMaiorSala){
      qtdeMaiorSala = mod.sala.qtde;
    }
  }

  if(soma == TOTAL_DE_ALUNOS){
    soma += 10;
  }

  //soma += modulos.length;
  soma += Math.abs( qtdeMaiorSala - fatorDePesoSecundario ) / qtdeMaiorSala;

  return soma;
}

function clone(cloned){
  return JSON.parse(JSON.stringify(cloned));
}

function random(max){
  return Math.floor((Math.random() * max))
}

module.exports = router;
