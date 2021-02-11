import * as fetch from "./functions/fetch.js";

let id_occurrence = sessionStorage.getItem("id_occurrence");

let slider1 = document.getElementById("review1");
var output1 = document.getElementById("value1");
output1.innerHTML = slider1.value;
slider1.oninput = function() {
  output1.innerHTML = this.value;
  findTotal();
};

let slider2 = document.getElementById("review2");
let output2 = document.getElementById("value2");
output2.innerHTML = slider2.value;
slider2.oninput = function() {
  output2.innerHTML = this.value;
  findTotal();
};

let slider3 = document.getElementById("review3");
let output3 = document.getElementById("value3");
output3.innerHTML = slider3.value;
slider3.oninput = function() {
  output3.innerHTML = this.value;
  findTotal();
};

let slider4 = document.getElementById("review4");
let output4 = document.getElementById("value4");
output4.innerHTML = slider4.value;
slider4.oninput = function() {
  output4.innerHTML = this.value;
  findTotal();
};

let slider5 = document.getElementById("review5");
let output5 = document.getElementById("value5");
output5.innerHTML = slider5.value;
slider5.oninput = function() {
  output5.innerHTML = this.value;
  findTotal();
};

let slider6 = document.getElementById("review6");
let output6 = document.getElementById("value6");
output6.innerHTML = slider6.value;
slider6.oninput = function() {
  output6.innerHTML = this.value;
  findTotal();
};

function findTotal(){
  var arr = document.getElementsByName('eval');
  var tot=0;
  for(var i=0;i<arr.length;i++){
      if(parseInt(arr[i].innerHTML))
          tot += parseInt(arr[i].innerHTML);
  }
  document.getElementById('total').innerHTML = tot;
}

(async function(){
  let route1 = "occurrences/"+ id_occurrence +"/group_evaluation";

  document.getElementById("submit").addEventListener("click", function(){
    let data = {
      score : document.getElementById("total").innerHTML,
      invoices : document.getElementById("invoice").value
    };
    fetch.postData(route1, data);
    window.location = "occurrenceDate.html";
})();
});

document.getElementById("back").addEventListener("click", function(){
  window.location = "occurrenceDate.html";
});
