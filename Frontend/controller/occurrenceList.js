"use strict";
import * as fetch from "./functions/fetch.js";
import * as table from "./functions/table.js";
import * as selector from "./functions/selectorWeekMonthYear.js";

let typeUser = sessionStorage.getItem("profile");

if(typeUser == "administrator"){
    document.getElementById("btnoccurrence").style.display = "none";
}
    
    fillTable(0);
    $("#button1").click(function () {
        fillTable(0);
    });
    $("#button2").click(function () {
        fillTable(1);
    });
    $("#button3").click(function () {
        fillTable(2);
    });


    async function fillTable(type) {
        //Confirmar o tipo
        let routeNot = "occurrences/evaluations/not";
        let routeDone = "occurrences/evaluations/done";
        let occurrencesNot = await fetch.getData(routeNot);
        let occurrencesDone = await fetch.getData(routeDone);

        console.log(occurrencesNot)
        console.log(occurrencesDone)
        console.log(type);

        // Filtrar a lista de ocorrencias

        let occurrenceSelNot = selector.filtrator(occurrencesNot, type);
        let occurrenceSelDone = selector.filtrator(occurrencesDone, type);

        // se nao existir correncias
        if (!(occurrenceSelDone.length == 0 && occurrenceSelNot.length == 0)) {
            if (occurrenceSelNot.length == 0) {
                let tab = document.getElementById("tableNot");
                tab.innerHTML = "";
            }
            if (occurrenceSelDone.length == 0) {
                let tab = document.getElementById("tableDone");
                tab.innerHTML = "";
            }
        } else return;

        //Ordernar as ocurrencias por data de chegada
        occurrenceSelNot.sort(function (a, b) {
            var dateA = new Date(a.arrival), dateB = new Date(b.arrival)
            return dateA - dateB
        });
        occurrenceSelDone.sort(function (a, b) {
            var dateA = new Date(a.arrival), dateB = new Date(b.arrival)
            return dateA - dateB
        });
        

        //Meter os arrays na tabela
        let dataNot = [];
        dataNot.head = [
            "ID",
            "Chegada",
            "Partida"
        ]

        let dataDone = [];
        dataDone.head = [
            "ID",
            "Chegada",
            "Partida"
        ]

        dataNot.body = occurrenceSelNot;
        dataDone.body = occurrenceSelDone;
        

        let tabNot = document.getElementById("tableNot");
        tabNot.innerHTML = table.fillTable(dataNot);
        let tabDone = document.getElementById("tableDone");
        tabDone.innerHTML = table.fillTable(dataDone);

        $("#tableNot tr").click(function() {
            var selected = $(this).hasClass("highlight");
            $("#tableNot tr").removeClass("highlight");
            if(!selected)
                    $(this).addClass("highlight");
    
                    var id = $(this).closest("tr").find('td:eq(-3)').text();
                    console.log(id);
            sessionStorage.setItem("id_occurrence", id);
        });

        
      
        document.getElementById("btnoccurrence").addEventListener("click", function(){
            var selected = $("#tableNot tr").hasClass("highlight");
            if(selected) {
            window.location ="occurrenceDate.html";
            } else {
                alert("Selecione uma ocorrência");
            }
        });
    }

document.getElementById("back").addEventListener("click", function(){
    window.location = "mainPage.html";
})
