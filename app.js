/* importar as configurações do servidor */
var app = require('./config/server');

// importar o package request
const request = require('request');

// Callwatson api
var watson = require('watson-developer-cloud');

//conversation params api
var conversation = watson.conversation({
  username: '815f362f-51e6-4436-912b-85f75ccb93dc',
  password: '1tYjHndvzvQo',
  version: 'v1',
  version_date: '2018-01-09'
});

/* parametrizar a porta de escuta */
var server = app.listen(80, function(){
	console.log('Servidor online');
});


// função que busca o cep, utilizando a api do viacep
function buscaCep(cep, data){
     var url = 'https://viacep.com.br/ws/'+ cep + '/json/';

			request(url, function(error,response,body){
			  let cepp = JSON.parse(response.body);
         data(cepp);
			});
}



// chamada da api do conversation

      function callWatson(msgText){

		conversation.message({
   workspace_id: 'd28d6c91-7c99-41fc-92c3-a307356bbf57',
   input: {'text': msgText}
 },  function(err, response) {
   if (err)
     console.log('error:', err);
   else
	 if(response.intents[0].intent === "buscacep"){
		 buscaCep("72260879", function(data,res){
			 console.log(data.cep)
		 });
	 }
 });
			}

callWatson("preciso de um cep");



var io = require('socket.io').listen(server);

app.set('io', io);



/* criar a conexão por websocket */
io.on('connection', function(socket){
	console.log('Usuário conectou');
	 var mensagem = "Aguarde um atendente";
	 var usuarios = 0;
	 usuarios=+1;

	socket.on('disconnect', function(){
		console.log('Usuário desconectou');
	});

	socket.on('msgParaServidor', function(data){


		/* dialogo */
		socket.emit(
			'msgParaCliente',
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		socket.broadcast.emit(
			'msgParaCliente',
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		/* participantes */
		if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
			socket.emit(
				'participantesParaCliente',
				{apelido: data.apelido}
			);

			socket.broadcast.emit(
				'participantesParaCliente',
				{apelido: data.apelido}
			);
		}
	});

});
