/* importar as configurações do servidor */
let app = require('./config/server')
let server = require('http').Server(app)
let io = require('socket.io')(server)
let port = process.env.PORT || 8080

/* criar a conexão por websocket */
io.on('connection', function(socket){
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
		console.log(data)

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


/* parametrizar a porta de escuta */
server.listen(port, function(){
	console.log(`Servidor online na ports ${port}`)
})
