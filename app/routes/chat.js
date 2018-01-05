module.exports= function(app){
app.get('/chat', function(req ,res){
    var dadosForm = req.body;
    console.log(dadosForm);
  	app.get('io').emit(
  		'msgParaCliente',

  		{apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat'}

  	)

  	res.render("chat", {dadosForm : dadosForm});

});
app.post('/chat', function(req ,res){
    let dadosForm = req.body;
    console.log(dadosForm);
  	app.get('io').emit(
  		'msgParaCliente',

  		{apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat'}

  	)

  	res.render("chat", {dadosForm : dadosForm});

});
}
