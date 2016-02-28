var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:1234@localhost:7474');

var geracao = 0;

const NUMERO_INDIVIDUOS = 120;
const TOTAL_DE_GERACOES = 1000;

var valoresDeMutacao = [0.007, 0.07, 0.3]
var indiceDeMutacao = 0;
var limitador = 0;
var salas;
var instrutores;
var alunos;
var modulos;

exports.executa = function(req, res){
  indiceDeMutacao = 0;
  geracao = 0;
  var callBackInitEnv = function(){
    log('Total de alunos: ' + alunos.length);
    console.log(getHora('Hora: '));
    var populacao = criaPopulacao();
    var contadorFatorMaximo = 0;
    var fatorMaximo = populacao.individuos[0].pontuacao;
    for (var i = 0; i < TOTAL_DE_GERACOES; i++) {
      console.log(getHora('Hora: ') + ' - ' + 'geracao atual: ' + geracao + ' - pontuacao max: ' + populacao.individuos[0].pontuacao);
      criaPopulacao(populacao);
      if(populacao.individuos[0].pontuacao > fatorMaximo){
        fatorMaximo = populacao.individuos[0].pontuacao;
        contadorFatorMaximo = 0;
        indiceDeMutacao = 0;
      }else{
        contadorFatorMaximo++;
        switch (contadorFatorMaximo) {
          case 10:
            indiceDeMutacao = 1;
            break;
          case 20:
            indiceDeMutacao = 2;
            break;
          default:

        }
      }
      if(contadorFatorMaximo == 30){
        break;
      }
      console.log('contadorFatorMaximo: ' + contadorFatorMaximo);
      console.log('indiceDeMutacao: ' + indiceDeMutacao);
    }

    res.status(200).send(populacao);

    /*
    res.status(200).send({salas: salas,
                          instrutores: instrutores,
                          alunos: alunos,
                          modulos: modulos,
                          limitador: limitador
                        });
                        */
  };
  var callBackErr = function(err){
    res.status(500).send(err);
    return console.log(err);
  };

  initEnv(callBackInitEnv, callBackErr);
}

function getSalas(callBack, callBackErr){
  var salaModel = require('./../models/sala.js');
  salaModel.getSalas(function(err,results){
    if (err) {
      return callBackErr(err);
    }
    callBack(results);
  });
}

function getInstrutores(callBack, callBackErr){
  var instrutorModel = require('./../models/instrutor.js');
  instrutorModel.getInstrutores(function(err, results){
    if (err) {
      return callBackErr(err);
    }
    callBack(results);
  });
}

function getAlunos(callBack, callBackErr){
  var alunoModel = require('./../models/aluno.js');
  alunoModel.getAlunos(null, function(err, results){
    if (err) {
      return callBackErr(err);
    }
    callBack(results);
  });
}

function getModulos(callBack, callBackErr){
  var moduloModel = require('./../models/modulo.js');
  moduloModel.getModulos(null, function(err,results){
    if (err) {
      return callBackErr(err);
    }
    callBack(results);
  });
}

function initEnv(callBack, callBackErr){
  getSalas(function(resSalas){
    salas = resSalas;
    getInstrutores(function(resInstrutores){
      instrutores = resInstrutores;
      if(Array.isArray(instrutores) && Array.isArray(salas)){
        if(salas.length > instrutores.length){
          limitador = instrutores.length;
        }else{
          limitador = salas.length;
        }
        getModulos(function(resModulos){
          modulos = resModulos;
          getAlunos(function(resAlunos){
            alunos = resAlunos;
            callBack();
          }, callBackErr);
        }, callBackErr);
      }
    }, callBackErr);
  }, callBackErr);
}

function criaPopulacao(populacao){
  var novaPopulacao = {individuos:[]};
  if(populacao){
    //var limite = populacao.individuos.length - 1;
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
          if(Math.random() < valoresDeMutacao[indiceDeMutacao]){
            mod.objModulo = modulos[random(modulos.length)].modulo.properties;
          }
      }
      //Mutação do filho 2
      for (mod of ind2.modulos) {
          if(Math.random() < valoresDeMutacao[indiceDeMutacao]){
            mod.objModulo = modulos[random(modulos.length)].modulo.properties;
          }
      }
      resultRoleta.push(ind1);
      resultRoleta.push(ind2);

    } while (roleta.length > 1);
    if(roleta.length == 1){
      resultRoleta.push(roleta.pop());
    }
    novaPopulacao.individuos = resultRoleta;
    //Se gerou clone eu forço a mutação
    for (var i = 0; i < populacao.individuos.length; i++) {
      ind = populacao.individuos[i];
      while (verificaIndividuoDuplicado(ind, i, populacao.individuos)){
        for (mod of ind.modulos) {
            if(Math.random() < 0.1){
              mod.objModulo = modulos[random(modulos.length)].modulo.properties;
            }
        }
      }
    }
    for (ind of novaPopulacao.individuos) {
      for (mod of ind.modulos) {
        mod.alunos = [];
      }
    }
    for (ind of novaPopulacao.individuos) {
      var alunosParaAlocacao = clone(alunos);
      for (var i = 0; i < 5; i++) {
        for (mod of ind.modulos) {
          alocaJovens(mod, ind, random(10)/10, alunosParaAlocacao);
        }
      }
      for (mod of ind.modulos) {
        alocaJovens(mod, ind, null, alunosParaAlocacao);
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
      for (var j = 0; j < limitador; j++) {
          criaModulo(individuo);
      }
      var alunosParaAlocacao = clone(alunos);
      for (var j = 0; j < 5; j++) {
        for (mod of individuo.modulos) {
          alocaJovens(mod, individuo, random(10)/10, alunosParaAlocacao);
        }
      }
      for (mod of individuo.modulos) {
        alocaJovens(mod, individuo, null, alunosParaAlocacao);
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

function criaModulo(individuo){
  var modulo = {objModulo: {}, alunos:[], sala: {}};
  var modSorteado = modulos[random(modulos.length)].modulo.properties;
  do {
    modSorteado = modulos[random(modulos.length)].modulo.properties;
  } while (moduloNoIndividuo(individuo, modulo));
  modulo.objModulo = modSorteado;
  for (var sala = 0; sala < limitador; sala++) {
    if(!salaNoIndividuo(individuo, salas[sala].sala.properties)){
      modulo.sala = salas[sala].sala.properties;
      break;
    }
  }
  //alocaJovens(modulo, individuo, 0.2);
  individuo.modulos.push(modulo);
}

function moduloNoIndividuo(individuo, modulo){
  for (var i = 0; i < individuo.modulos.length; i++) {
    if(individuo.modulos[i].objModulo.codigo == modulo.codigo){
      return true;
    }
  }
  return false;
}


function alunoNoIndividuo(individuo, aluno){
  if(individuo.modulos){
    for (mod of individuo.modulos) {
      //if(mod.hasOwnProperty('alunos')){
        for (al of mod.alunos) {
          if(al.cpf == aluno.cpf){
            return true;
          }
        }
      //}
    }
  }
  return false;
}

function salaNoIndividuo(individuo, sala){
  if(individuo.modulos){
    for (var i = 0; i < individuo.modulos.length; i++) {
      if(individuo.modulos[i] && individuo.modulos[i].hasOwnProperty('sala')){
        if(individuo.modulos[i].sala.codigo == sala.codigo){
          return true;
        }
      }
    }
  }
  return false;
}

function alocaJovens(modulo, individuo, taxaReducao, alunosParaAlocacao){
  if(modulo.sala.quantidade > modulo.alunos.length){
    var limite = (modulo.sala.quantidade - modulo.alunos.length) - 1;
    if(taxaReducao){
      limite = Math.floor(limite * taxaReducao);
    }
    for (var i = 0; i < alunosParaAlocacao.length; i++) {
      var aluno = alunosParaAlocacao[i];
      if(aluno.modulos.findIndex(function(item, index, arr){
          return item.properties.codigo == modulo.objModulo.codigo;
        }) > -1){
        //if(!alunoNoIndividuo(individuo, aluno.aluno.properties)){
          modulo.alunos.push(aluno.aluno.properties);
          alunosParaAlocacao.splice(i, 1);
          if(modulo.alunos.length > limite){
            break;
          }
        //}
      }
    }
  }
}

function funcaoObjeto(individuo){
  var soma = 0;
  var tamanhoMedioDaSala = 0;
  var qtdeMediaJovensNaSala = Math.floor(alunos.length/individuo.modulos.length);
  var fatorDePesoSecundario = 0;
  var qtdeMaiorSala = 0;
  for (mod of individuo.modulos) {
    soma += mod.alunos.length;
    fatorDePesoSecundario += Math.abs(qtdeMediaJovensNaSala - mod.alunos.length);
    if(mod.sala.quantidade > qtdeMaiorSala){
      qtdeMaiorSala = mod.sala.quantidade;
    }
  }

  if(soma == alunos.length){
    soma += 10;
  }
  soma += ( qtdeMaiorSala - fatorDePesoSecundario ) / qtdeMaiorSala;
  return soma;
}


function clone(cloned){
  return JSON.parse(JSON.stringify(cloned));
}

function random(max){
  return Math.floor((Math.random() * max))
}

function log(obj){
  console.log(JSON.stringify(obj));
}

function verificaIndividuoDuplicado(individuo, indiceInd, individuos){
  var indice = individuos.findIndex(function(item, ind, arr){
    var ret = true;
    if(ind == indiceInd){
      ret = false;
    }else{
      for (var i = 0; i < item.modulos.length; i++) {
        if(item.modulos[i].objModulo.codigo != individuo.modulos[i].objModulo.codigo){
          ret = false;
          break;
        }
      }
    }

    return ret;
  });
  return indice > -1
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

function getHora(string){
    var d = new Date();
    return string + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ':' + d.getMilliseconds();
}
