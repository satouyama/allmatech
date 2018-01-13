module.exports= function(app){
app.get('/chat', function(req ,res){
	var dadosForm = req.body;




		app.get('io').emit(
			'msgParaCliente',
			{apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat'}
		)

		res.render("chat", {dadosForm : dadosForm});

});
app.post('/chat', function(req ,res){
	var dadosForm = req.body;

	console.log(dadosForm);

 /*
	var connection = app.config.dbConnection();
	var cadastro = new app.app.cadastroDAO.cadastroDAO(connection);

       cadastro.cadastroUsuario(dadosForm, function(error, result){
           if(error) {
			   console.log(error);
		   } else {


		   }
	   });
*/
    res.render("chat", {dadosForm : dadosForm});

		



});
}
