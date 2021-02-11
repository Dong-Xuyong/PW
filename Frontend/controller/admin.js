"use strict";
import * as fetch from "./functions/fetch.js";
import * as table from "./functions/table.js";


(async function() {
    await refreshAudits();
    let route;
    let id_login;
    
    $("#tableAudits tr").click(function() {
        var selected = $(this).hasClass("highlight");
        $("#tableNot tr").removeClass("highlight");
        if(!selected)
                $(this).addClass("highlight");

                var id = $(this).closest("tr").find('td:eq(-4)').text();
                console.log(id);
                id_login = id;
    });


    document.getElementById("deleteAuditor").addEventListener("click", function(){
        var selected = $("#tableAudits tr").hasClass("highlight");
        if(selected) {
        route = "audits/" + id_login;
        fetch.deleteData(route);
        refreshAudits();
        } else {
            Swal.fire("Selecione um auditor");
        }
    });
})();


async function refreshAudits() {
    let route = "audits";
    const users = await fetch.getData(route);
    console.log(users);
    let tab = document.getElementById("tableAudits");
    
    let data= [];
    data.head= ["ID","Nome", "Idade", "Número"];
    data.body=users;
    tab.innerHTML =  table.fillTable(data);
}

document.getElementById("addAuditor").addEventListener("click", function() {
    window.location = "newAuditor.html";
});

