import * as fetch from "./functions/fetch.js"

let id_occurrence = sessionStorage.getItem("id_occurrence");

async function preencher() {
  let route1 = "occurrences/" + id_occurrence + "/arrival/"
  let occurrence = await fetch.getData(route1, { id_occurrence });
  let arrival1 = new Date(occurrence[0].arrival);
  let time = "" + arrival1.getHours() + ":" + arrival1.getMinutes() + "";
  document.getElementById("time").value = time;
};

preencher();

(async function() {
  let route1 = "occurrences/" + id_occurrence + "/arrival/"
  let occurrence = await fetch.getData(route1, { id_occurrence });
  let arrival1 = new Date(occurrence[0].arrival);
  let setter;
  document.getElementById("submit").addEventListener("click", function() {
    let arrival2 = new Date(arrival1).toISOString().slice(0, 10);
    setter = document.getElementById("time").value;
    let setter1 = arrival2 + " " + setter;
    let data = {
      arrival: setter1
    };
    console.log(data);
    fetch.putData(route1, data);
    window.location = 'checkList.html';
  })
})()

document.getElementById("back").addEventListener("click", function() {
  window.location = "occurrenceDate.html"
})

document.getElementById("submit").addEventListener("click", function() {
  window.location = 'checkList.html';
})
