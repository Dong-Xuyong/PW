import * as fetch from "./functions/fetch.js"

$('#myTable').on('click', 'i', function () {
    $(this).closest('div').remove();
});

$('p button').click(function () {
    $('#myTable').append('<div class="field" name="witnesses"><div class="input-wrapper"><h4>Testemunho:</h4><input type="text" class="testimony"><i class="fas fa-times icon"></i></input></div></div><div class="field"><div class="input-wrapper"><h4>Justificação:</h4><input type="text" class="justification"/><i class="fas fa-times icon"></i></input></div></div>')
});

let id_occurrence = sessionStorage.getItem("id_occurrence");

document.getElementById("back").addEventListener("click", function(){
    window.location = "occurrenceDate.html";
})

document.getElementById("submit").addEventListener("click", function(){
    var nodesSameName = document.getElementsByName("witnesses");
    let witnessesNumber = nodesSameName.length;
    let test = document.getElementsByClassName("testimony");
    let just = document.getElementsByClassName("justification");
    for (let i = 0; i<witnessesNumber; i++){
        let route = "occurrences/" + id_occurrence + "/witnesses";
        let testimony = test[i].value;
        let justification = just[i].value;
        let data = {
            testimony,
            justification
        }
        fetch.postData(route, data);
    }
    window.location = 'occurrenceDate.html';
})