

window.onload = function() {
    

validator();
    document.getElementById("formNewUser").onsubmit = function(e) {
        //validação do formulário ao submeter
        validator();
    };
    
    
    //função de validação
    function validator() {
        new Validator(document.querySelector('form[name="formNewUser"]'), function(err, res) {
            if (res) {
                saveUsers();
            }
        }, {
            rules: {
                password: function(value) {
                    console.log(value);
                    return (value === document.getElementById("pwd").value);
                }
            },
            messages: {
                en: {
                    password: {
                        incorrect: "Password didn't match"
                    }
                }
            }
        });
    }
    
    
function saveUsers() {
        var data = {};
        data.name = document.getElementById("name").value;
        data.email = document.getElementById("email").value;
        data.pass = document.getElementById("pwd").value;
        console.log(data); //debugging para ver os dados que foram enviados
        //chamada fetch para envio dos dados para o servior via POST
        fetch('https://cc102f71a59f4b86b46f44cac1acf38f.vfs.cloud9.us-east-1.amazonaws.com/users', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(function(response) {
            if (!response.ok) {
                console.log(response.status); //=> number 100–599
                console.log(response.statusText); //=> String
                console.log(response.headers); //=> Headers
                console.log(response.url); //=> String
                if (response.status === 409) {
                    alert("Duplicated Email");
                }
                else {
                    throw Error(response.statusText);
                }
            }
            else {
                document.getElementById("formNewUser").reset(); //limpeza dos dados do form
                alert("submitted with success");
                refreshUsers();
            }
        }).then(function(result) {
            console.log(result);
        }).catch(function(err) {
            alert("Submission error");
            console.error(err);
        });
    }
    
}