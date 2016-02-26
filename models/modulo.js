var neo4j = require('node-neo4j');
var db = new neo4j('http://neo4j:1234@localhost:7474');

exports.getModulos = function(callBack){
  console.log('Que merda');
  var query = 'MATCH (a:Aluno)-[faz:FAZ {concluiu:{concluiu}}]->(m:Modulo) ';
  query += 'return distinct m as modulo ';
  query += 'order by modulo.id';
  var params = {concluiu: false};

  db.cypherQuery( query, params, callBack );
};
