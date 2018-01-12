var watson = require('watson-developer-cloud');
var prompt = require('prompt-sync')();
 var conversation = watson.conversation({
    username: '815f362f-51e6-4436-912b-85f75ccb93dc',
    password: '1tYjHndvzvQo',
    version: 'v1',
    version_date: '2018-01-09',
  });





  function processaResposta(error, response){
      console.log(response);
      var novaMensagemUsuario = prompt('>>');
      var payload = {
          workspace_id : 'd28d6c91-7c99-41fc-92c3-a307356bbf57',
          input: {'text':novaMensagemUsuario},
          context:response.context
    }

      conversation.message(payload,processaResposta);
  }

conversation.message({workspace_id: 'd28d6c91-7c99-41fc-92c3-a307356bbf57',input: {'text':"Olá"}},processaResposta);
