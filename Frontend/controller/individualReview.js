import * as fetch from "./functions/fetch.js";

let id_occurrence = sessionStorage.getItem("id_occurrence");
let id_operational = sessionStorage.getItem("id_operational");

let slider1 = document.getElementById("review1");
let output1 = document.getElementById("value1");
output1.innerHTML = slider1.value;
slider1.oninput = function() {
  output1.innerHTML = this.value;
};

let slider2 = document.getElementById("review2");
let output2 = document.getElementById("value2");
output2.innerHTML = slider2.value;
slider2.oninput = function() {
  output2.innerHTML = this.value;
};

let slider3 = document.getElementById("review3");
let output3 = document.getElementById("value3");
output3.innerHTML = slider3.value;
slider3.oninput = function() {
  output3.innerHTML = this.value;
};

let slider4 = document.getElementById("review4");
let output4 = document.getElementById("value4");
output4.innerHTML = slider4.value;
slider4.oninput = function() {
  output4.innerHTML = this.value;
};

let slider5 = document.getElementById("review5");
let output5 = document.getElementById("value5");
output5.innerHTML = slider5.value;
slider5.oninput = function() {
  output5.innerHTML = this.value;
};

let slider6 = document.getElementById("review6");
let output6 = document.getElementById("value6");
output6.innerHTML = slider6.value;
slider6.oninput = function() {
  output6.innerHTML = this.value;
};


$(function () {
    var $range = $('#review1, #review2, #review3, #review4, #review5, #review6');
    var $totalPontos = $('#totalPontos');

    function track(event) { 
        var total = 0; 
                                                
        $range.each(function (i, element) { 
            total += parseInt($(element).val(), 6); 
        });

        $totalPontos.html(total);
    }

    $range.on('change', track); 
 });

(async function(){
  
  let route1 = "occurrences/"+ id_occurrence +"/individual_evaluation/notDone";
  let route2 = "occurrences/"+ id_occurrence +"/individual_evaluation/" + id_operational;
  //operacionais nao avaliados
  let operationals = await fetch.getData(route1);

  //obter o operacional da pagina
  let operational; 
    for(const oper of operationals){
      if(oper.id_operational == id_operational){
        operational = oper;
        break;
      }
    }
    console.log(operational);
  document.getElementById("name").innerText= operational.name;
  let score;

  document.getElementById("submit").addEventListener("click", function(){
    score = document.getElementById("totalPontos").innerText;
    operational.score = score;
    operational.id_occurrence = id_occurrence;
    console.log(operational);

    
    fetch.putData(route2, operational);
  });
})();

document.getElementById("back").addEventListener("click", function(){
    window.location = "occurrenceDate.html";
})

document.getElementById("submit").addEventListener("click", function(){
    window.location = "occurrenceDate.html";
})