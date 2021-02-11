import * as fetch from "./functions/fetch.js";
import * as root from "./functions/dark.light.js";


window.onload = function() {
    root.setColor();
    validator();
    

    // submit
    document.getElementById("formNewUser").onsubmit = function(e) {
        //validação do formulário ao submeter
        validator();
    };
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
                    incorrect: "As palavras-passe não coicidem"
                }
            }
        }
    });
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function saveUsers() {
    var data = {};
    let route = "audits";
    data.id_login = document.getElementById("id_login").value;
    data.name = document.getElementById("name").value;
    data.email = document.getElementById("email").value;
    data.date_birth = document.getElementById("date").value;
    data.age = getAge(data.date_birth).toString();
    data.phone_nr = document.getElementById("n_tel").value;
    data.cc = document.getElementById("cc").value;
    data.password = document.getElementById("pwd").value;
    console.log(data); //debugging para ver os dados que foram enviados

    //chamada fetch para envio dos dados para o servior via POST
    fetch.postData(route, data);
}


document.getElementById("back").addEventListener("click", function() {
    window.location = "admin.html";
});

