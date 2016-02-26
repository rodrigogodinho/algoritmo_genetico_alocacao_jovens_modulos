var neo4j = require('node-neo4j');
var db = new neo4j('http://neo4j:1234@localhost:7474');

var geracao = 1;

const NUMERO_INDIVIDUOS = 400;
const TOTAL_DE_GERACOES = 250;

exports.executa = function(req, res){
  var query = 'MATCH (a:Aluno)-[faz:FAZ {concluiu:{concluiu}}]->(m:Modulo) ';
  query += 'return a.cpf as alunos, collect(m.codigo) as modulos, size(collect(m)) as qtdeModulos ';
  query += 'order by qtdeModulos, a.cpf limit {limite}';
  var params = {concluiu: false, limite: 10 };
  /*
  db.cypherQuery( query, params, function (err, result) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
      console.log(result.data); // delivers an array of query results
      var retorno = {};

      res.status(200).send(arrNeo4JToArrAlunos(result.data));
    }
  );
  */
  var moduloModel = require('./../models/modulo.js');
  var modulos = moduloModel.getModulos(function(err,modulos){
    if (err) {
      res.status(500).send(err);
      return console.log(err);
    }    
    res.status(200).send(modulos);
  });
  //res.status(200).send(modulos);
  //res.status(200).send('Teste');
  /*
  var populacao = criaPopulacao();
  for (var i = 0; i < TOTAL_DE_GERACOES; i++) {
    console.log('geracao atual: ' + geracao + ' - pontuacao max: ' + populacao.individuos[0].pontuacao);
    criaPopulacao(populacao);
  }
  res.status(200).send(populacao);
  */
}

function arrNeo4JToArrAlunos(arr){
  var alunos = []
  for (item of arr) {
    alunos.push({cpf: item[0], modulos:item[1]});
  }
  return alunos;
}

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
