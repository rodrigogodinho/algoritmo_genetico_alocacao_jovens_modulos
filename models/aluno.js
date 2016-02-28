var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:1234@localhost:7474');

exports.getAlunos = function(params, callBack){
  var query = 'MATCH (a:Aluno)-[faz:FAZ {concluiu:{concluiu}}]->(m:Modulo) ';
  query += 'return a as aluno, collect(m) as modulos, size(collect(m)) as qtdeModulos ';
  query += 'order by qtdeModulos, aluno.cpf';

  if(!params){
    params = {concluiu: false};
  }

  db.cypher({
              query: query,
              params: params
            },
            callBack);
};
