import * as fetch from "./functions/fetch.js";

let id_occurrence = sessionStorage.getItem("id_occurrence");

(async function() {
    let route = "occurrences/"+ id_occurrence + "/operationals/";
    let operationals = await fetch.getData(route);
    console.log(operationals);
    let txt = `<div class="container-3">    
    <h5 id="registoColab">Registo de colaboradores no terreno: </h5>
    <div class="form">
        <form>`
    
    for(const operational of operationals) {
    txt += `
            <div class="checkbox-container">
                <input type="checkbox" name="checkbox" id="${operational.id_operational}"></input>
                <label> ${operational.name} </label><br>
            </div>
    `   
    }

    txt +=`
            </form>
        </div>
    </div>
    `
    document.getElementById("presences").innerHTML = txt;
    console.log(txt);
    let checkboxes = document.getElementsByName("checkbox");
    let submit = document.getElementById("submit");
    let routeOpera;
    submit.addEventListener("click", function() {
        for(const operational of operationals){
            for(const checkbox of checkboxes){
                if(checkbox.id == operational.id_operational) {
                    if(checkbox.checked){
                        operational.checked = "1";
                    } else {
                        operational.checked = "0";
                    }
                }
            }
            routeOpera = route + operational.id_operational;
            console.log(operational);
            fetch.putData(routeOpera, operational);
            window.location = "occurrenceDate.html";
        }
    });
})();

document.getElementById("back").addEventListener("click", function(){
    window.location = "occurrenceDate.html";
});

document.getElementById("submit").addEventListener("click", function(){
    window.location = "occurrenceDate.html";
});