var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:1234@localhost:7474');

exports.getModulos = function(params, callBack){
  var query = 'MATCH (a:Aluno)-[faz:FAZ {concluiu:{concluiu}}]->(m:Modulo) ';
  query += 'return distinct m as modulo ';
  query += 'order by modulo.id';
  if(!params){
    params = {concluiu: false};
  }

  db.cypher({
    query: query,
    params: params,
  }, callBack);
};
