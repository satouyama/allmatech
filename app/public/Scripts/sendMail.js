$("#send_button").on("click", function () {

    if ($("#name").val() != "" && $("#email").val() != "" && $("#telefone").val() != "" && $("#msg").val() != "") {
        var nome = $("#name").val();
        var mail = $("#email").val();
        var fone = $("#telefone").val();
        var msg = $("#msg").val();

        var Contato = {
            name : nome,
            email : mail,
            telefone : fone,
            message : msg         
        };

        $.post("/Home/EnviaEmail", Contato).done(function (data){
            alert(data);    
        });


        $("#name").val("");
        $("#email").val("");
        $("#telefone").val("");
        $("#msg").val("");

    } else {
        alert("Preencha todos os campos do formulário!");
    }
});