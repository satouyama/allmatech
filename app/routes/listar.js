module.exports = function(app){

app.get('/listar',function(req,res){
    var connection = app.config.dbConnection();
    var listar = new app.app.cadastroDAO.cadastroDAO(connection);
    
    listar.listarUsuario(function(error,result){
       if(error) {
           console.log(error);
       } else {
        res.render('listar',{data : result});
       }
    });
    
    
});


}