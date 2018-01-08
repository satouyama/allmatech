/* importar as configurações do servidor */
<<<<<<< HEAD
var app = require('./config/server');
/* parametrizar a porta de escuta */
var server = app.listen(80, function(){
	console.log('Servidor online');
})


var io = require('socket.io').listen(server);

app.set('io', io);
=======
let app = require('./config/server')
let server = require('http').Server(app)
let io = require('socket.io')(server)
let port = process.env.PORT || 8080
>>>>>>> a530ea3046e2a17e6b41a00cb2de5877f3025f95



/* criar a conexão por websocket */
io.on('connection', function(socket){
<<<<<<< HEAD
	console.log('Usuário conectou');
	 var mensagem = "Aguarde um atendente";
	 var usuarios = 0;
	 usuarios=+1;
	 
=======
	console.log('Usuário conectou')

	let apelido = ''

	socket.on('enter', (data) => {
		apelido = data
		socket.broadcast.emit(
			'msgParaCliente',
			{apelido, mensagem: ' acabou de entrar no chat'}
		)
		socket.emit(
			'msgParaCliente',
			{apelido, mensagem: ' acabou de entrar no chat'}
		)
	})

>>>>>>> a530ea3046e2a17e6b41a00cb2de5877f3025f95
	socket.on('disconnect', function(){
		socket.broadcast.emit(
			'msgParaCliente',
			{apelido, mensagem: ' saiu do chat'}
		)
		socket.emit(
			'msgParaCliente',
			{apelido, mensagem: ' saiu do chat'}
		)
	})

	socket.on('msgParaServidor', function(data){
<<<<<<< HEAD
		  
=======
		console.log(data)

>>>>>>> a530ea3046e2a17e6b41a00cb2de5877f3025f95
		/* dialogo */
		socket.emit(
			'msgParaCliente',
			{apelido: data.apelido, mensagem: data.mensagem}
		)

		socket.broadcast.emit(
			'msgParaCliente',
			{apelido: data.apelido, mensagem: data.mensagem}
		)

		/* participantes */
		if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
			socket.emit(
				'participantesParaCliente',
				{apelido: data.apelido}
			)

			socket.broadcast.emit(
				'participantesParaCliente',
				{apelido: data.apelido}
			)
		}
	})

})


<<<<<<< HEAD
});

=======
/* parametrizar a porta de escuta */
server.listen(port, function(){
	console.log(`Servidor online na ports ${port}`)
})
>>>>>>> a530ea3046e2a17e6b41a00cb2de5877f3025f95
