import * as fetch from "./functions/fetch.js"

let id_occurrence = sessionStorage.getItem("id_occurrence");

(async function () {
    let route = "occurrences/" + id_occurrence + "/operationals/";
    let operationals = await fetch.getData(route);
    let operationalsChecked = [];

    //Obter os operacionais presentes
    for (const operational of operationals) {
        console.log(operational)
        if(operational.checked==1)
        operationalsChecked.push(operational);
    }

    // Obter os operationais avaliados e nao avaliados
    let routeNot = "occurrences/" + id_occurrence + "/individual_evaluation/notdone";
    let operationalsNot = await fetch.getData(routeNot);
    console.log(operationalsNot)
    let routeDone = "occurrences/" + id_occurrence + "/individual_evaluation/done";
    let operationalsDone = await fetch.getData(routeDone);

    
    //Diferenciar os operacionais avaliados dos nao avalidados
    let IDs = [];
    for(let i=0; i< operationalsChecked.length; i++){
        for(let j=0; j< operationalsNot.length; j++){
            // console.log(operationalsChecked[i].id_operational)
            if(operationalsChecked[i].id_operational == operationalsNot[j].id_operational)
            IDs.push(operationalsChecked[i].id_operational);
        }
    }
    console.log(IDs)
    //conteudo dinamico
    
    let txt = `<div class="container-3">
    <h5 id="teamMember">Escolha o elemento da equipa para avaliar:</h5>
        <ul>`;

    for(const operationalChecked of operationalsChecked) {
        // console.log(operationalChecked.id_operational)
        txt += `<li class="item"><a id="${operationalChecked.id_operational}" href ="#"> ${operationalChecked.name} </a></li>`;
    }
    txt += `
        </ul>
    </div>
    `;
    document.getElementById("listOperationals").innerHTML = txt;


    // tornar links os operacionais nao avaliados
    // console.log(IDs)
    for(const ID of IDs){
    // console.log(ID)
    // console.log(document.getElementById(ID))
    document.getElementById(ID).addEventListener("click", function() {
        sessionStorage.setItem("id_operational", ID);
        window.location = "individualReview.html";
    });
    }
})();

document.getElementById("back1").addEventListener("click", function(){
    window.location = "occurrenceDate.html";
});

