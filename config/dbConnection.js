// Modulo que busca no banco de dados
const mysql = require('mysql');


// Conexão com o banco de dados
var connMysql = function() {
  return mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'allmatech'

  });
}


//exports  a conexão 
module.exports = function(){
    return connMysql;
}
