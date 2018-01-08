<<<<<<< HEAD
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
	
	
	 
		app.get('io').emit(
			'msgParaCliente',
			{apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat'}
		)
	
		res.render("chat", {dadosForm : dadosForm});
=======
const router = require('express').Router()

router.route('/')
>>>>>>> a530ea3046e2a17e6b41a00cb2de5877f3025f95

.post((req ,res) => {
	res.render("chat", {dadosForm: req.body})
})

module.exports = router
