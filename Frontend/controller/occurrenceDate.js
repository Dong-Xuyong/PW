import * as fetch from "./functions/fetch.js";


let id_occurrence = sessionStorage.getItem("id_occurrence");

//criar uma funcao async
(async function() {
    let route = "occurrences/"+id_occurrence;
    let dateOccu = await fetch.getData(route);
    console.log(dateOccu);
    console.log(dateOccu[0].victim_number);
    document.getElementById("victimNumber").innerHTML = dateOccu[0].victim_number;
    document.getElementById("occurrenceType").innerHTML = dateOccu[0].occurrence_type;
    document.getElementById("local").innerHTML = dateOccu[0].local;
})();

document.getElementById("back").addEventListener("click",function(){
    window.location = "occurrenceList.html";
});

document.getElementById("workers").addEventListener("click",function(){
    window.location = "presences.html";
});

document.getElementById("arrivalTime").addEventListener("click",function(){
    window.location = "arrivalTime.html";
});

document.getElementById("teamReview").addEventListener("click",function(){
    window.location = "teamReview.html";
});

document.getElementById("teamMembers").addEventListener("click",function(){
    window.location = "teamMembers.html";
});

document.getElementById("externelEvaluation").addEventListener("click",function(){
    window.location = "externelEvaluation.html";
});