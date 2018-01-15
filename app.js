/* importar as configurações do servidor */
var app = require('./config/server');

// importar o package request
const request = require('request');

// Callwatson api
var watson = require('watson-developer-cloud');
//payload


//conversation params api
var conversation = watson.conversation({
  username: 'b41326bd-8e10-436f-9656-6fd8c349fef2',
  password: 'exzZi1p3OlsA',
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












var io = require('socket.io').listen(server);

app.set('io', io);



/* criar a conexão por websocket */
io.on('connection', function(socket){
	let payload = {
		workspace_id : '1c2345d7-6ff1-4f62-9446-7b68508ca955',
		input: {
			text: 'Oi'
		}
	}
	console.log('Usuário conectou');
	
	socket.on('disconnect', function(){
		console.log('Usuário desconectou');
	});
        
	socket.on('msgParaServidor', function(data){
		  var msgCliente = data.mensagem;
		
		/* dialogo */
		socket.emit(
			'msgParaCliente',
			{apelido: data.apelido, mensagem: data.mensagem}
		);
         
		//
	//Atualizando a mensagem no Payload
	payload.input.text = msgCliente;

	//Enviando mensagem pro watson e obtendo resposta
	conversation.message(payload, (error, response) => {
		 console.log(response)
		       var msgBot = response.output.text[0];
		if(error){
			//Se ocorrer algum erro, enviar mensagem de erro pro cliente
			socket.emit('error',error.message)
		}
		else {
			//Se não, Enviar a resposta do Watson para o cliente
		       
			socket.emit(
				'msgDoBot',
				{apelido: "Assistente Virtual", mensagem: response.output.text[0]}
			);

			//E atualizar o contexto do payload
			payload.context = response.context

		}
	})

		//


		

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
