function cadastrar(connection){
 this._connection = connection;
}


cadastrar.prototype.cadastroUsuario = function(data,callback){
    this._connection.query("insert into chat_usuario set ?",data,callback);
}

cadastrar.prototype.listarUsuario = function(callback){
    this._connection.query('select *from chat_usuario',callback);
}

module.exports = function(){
    return cadastrar;
}