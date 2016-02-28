var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:1234@localhost:7474');

exports.getInstrutores = function(callBack){
  var query = 'MATCH (i:Instrutor) ';
  query += 'return i as instrutor ';
  query += 'order by instrutor.cpf';

  db.cypher({
    query: query
  }, callBack);
};
