/* importar as configurações do servidor */
var app = require('./config/server');

// importar o package request
const request = require('request');

// Callwatson api
var watson = require('watson-developer-cloud');
var contexid = "";
var text = null;

var params = {
	input: text,
	// context: {"conversation_id": conversation_id}
	context:contexid
};

var payload = {
	workspace_id: "d28d6c91-7c99-41fc-92c3-a307356bbf57"
};


if (params) {
	if (params.input) {
		params.input = params.input.replace("\n","");
		payload.input = { "text": params.input };
	}
	if (params.context) {
		payload.context = params.context;
	}
}


//conversation params api
var conversation = watson.conversation({
  username: '815f362f-51e6-4436-912b-85f75ccb93dc',
  password: '1tYjHndvzvQo',
  version: 'v1',
  version_date: '2018-01-09',
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

/*
function callWatson(msgText){
   conversation.message({
   workspace_id: 'd28d6c91-7c99-41fc-92c3-a307356bbf57',
   input: {'text': msgText}
   },  function(err, response) {
   if (err){
	 console.log('error:', err);
   }
   else {
	  var dados = response.output.text;
	  //como pegar esses dados aqui de cima ?
   }

 });
	}
*/




var io = require('socket.io').listen(server);

app.set('io', io);



/* criar a conexão por websocket */
io.on('connection', function(socket){
	console.log('Usuário conectou');

	socket.on('disconnect', function(){
		console.log('Usuário desconectou');
	});

	socket.on('msgParaServidor', function(data){
		 var msgCliente = data.mensagem;

		 var contexid = "";
         var text = msgCliente;
            console.log(text);
var params = {
	input: text,
	// context: {"conversation_id": conversation_id}
	context:contexid
};

var payload = {
	workspace_id: "d28d6c91-7c99-41fc-92c3-a307356bbf57"
};


if (params) {
	if (params.input) {
		params.input = params.input.replace("\n","");
		payload.input = { "text": params.input };
	}
	if (params.context) {
		payload.context = params.context;
	}
}


		/* dialogo */
		socket.emit(
			'msgParaCliente',
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		//
		conversation.message(payload,function (err, convResults) {
			console.log(convResults);

		   //console.log(contexid);

		   if (err) {
			   return responseToRequest.send("Erro.");
		   }

		   if(convResults.context != null)
			  conversation_id = convResults.context.conversation_id;
		   if(convResults != null && convResults.output != null){

			   var i = 0;
			     while(i < convResults.output.text.length){
				socket.emit(
					'msgDoBot',
					{apelido: "Atendimento Allmatech", mensagem: convResults.output.text[0]}
				);
				i++;
			   }
		   }

	   });

		//


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
