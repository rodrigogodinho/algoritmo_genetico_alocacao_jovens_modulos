var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:1234@localhost:7474');

exports.getSalas = function(callBack){
  var query = 'MATCH (s:Sala) ';
  query += 'return s as sala ';
  query += 'order by sala.codigo';

  db.cypher({
    query: query
  }, callBack);
};
