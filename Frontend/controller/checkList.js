import * as fetch from "./functions/fetch.js"

let id_occurrence = sessionStorage.getItem("id_occurrence");

(async function(){
  let route1 = "occurrences/"+ id_occurrence +"/checklist/";
  
    document.getElementById("submit").addEventListener("click", function(){
        let input1 = document.getElementById("action1");
        if (input1.checked) {
            input1 = 1;
        } else {
            input1 = 0
        }
        let input2 = document.getElementById("action2");
        if (input2.checked) {
          input2= 1;
      } else {
          input2= 0
      }
        let input3 = document.getElementById("action3");
        if (input3.checked) {
          input3 = 1;
      } else {
          input3 = 0
      }
        let input4 = document.getElementById("action4");
        if (input4.checked) {
          input4 = 1;
      } else {
          input4 = 0
      }
        let input5= document.getElementById("action5");
        if (input5.checked) {
          input5 = 1;
      } else {
          input5 = 0
      }
        let data = {
      question_1: input1,
      question_2: input2,
      question_3: input3,
      question_4: input4,
      question_5: input5
    }
    console.log(data)
    fetch.postData(route1, data);
    window.location = "occurrenceCost.html";
  })
})()

document.getElementById("submit").addEventListener("click", function() {
  window.location = "occurrenceCost.html";
})

document.getElementById("back").addEventListener("click", function() {
  window.location = "arrivalTime.html";
})