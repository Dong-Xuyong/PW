import * as fetch from "./functions/fetch.js"

let id_occurrence = sessionStorage.getItem("id_occurrence");
let distance = sessionStorage.getItem("distance_id_occurrence_"+id_occurrence);


async function preencher() {
    let route1 = "occurrences/" + id_occurrence + "/cost/fuel_average";
    let route2 = "occurrences/" + id_occurrence + "/cost/countop";
    let distancia = distance.slice(0, -3);

    document.getElementById("newDistance").value = distancia;
    let custogas = await fetch.getData(route1, {id_occurrence});

    let n_oper = await fetch.getData(route2, {id_occurrence});
    document.getElementById("newNumber").value = n_oper[0].count;

    let avg = custogas[0].fuel_average;
    document.getElementById("newFuel").value = avg;   
}

preencher();

document.getElementById("calcule").addEventListener("click", async function(){
    preencher();
    let route1 = "occurrences/" + id_occurrence + "/cost/fuel_average";
    let route2 = "occurrences/" + id_occurrence + "/cost/countop";
    let custogas = await fetch.getData(route1, {id_occurrence});
    let price = custogas[0].fuel_price;
    let avg = custogas[0].fuel_average;

    let n_oper = await fetch.getData(route2, {id_occurrence});
    let count = n_oper[0].count;
    let dur = document.getElementById("newDuration").value;

    let oper=0;
    let route3 = "occurrences/" + id_occurrence + "/cost/operationals";
    let costop = await fetch.getData(route3, {id_occurrence});

    if (document.getElementById("newDuration").value !== "" ) {
        for (let i = 0; i < count; i++) {
            oper = oper + (costop[i].pay_per_hour * dur);
        }
        let distance1 = parseFloat(distance);
        let costgas = (avg * distance1 / 100) * price;
        let costTotal = oper + costgas;
        document.getElementById("preco").innerHTML = costTotal.toFixed(2) + "€";
    } else {
        var notify = $.notify('<strong>Erro!</strong> Insira um valor na duração!', {
            type: 'danger',
            allow_dismiss: true,
          });
    }
});

document.getElementById("submit").addEventListener("click", async function(){
    let distance = document.getElementById("newDistance").value;
    let duration = document.getElementById("newDuration").value;
    let n_operationals = document.getElementById("newNumber").value;
    let costa = document.getElementById("preco").innerHTML;
    let cost = costa.slice(0, -1)
    let route1 = "occurrences/"+id_occurrence+"/cost";


    let data = {
        duration : duration,
        num_of_operationals : n_operationals,
        distance : distance,
        cost : cost
    }
    let data1 = {
        cost : cost
    }
    if (document.getElementById("newDuration").value !== "" ) {
        if (document.getElementById("preco").innerHTML !== "" ) {
          fetch.postData(route1, data);
          fetch.putData(route1, data1);
        } else {
            Swal.fire({
        title: 'Preenche todos os campos antes de continuar!',
        confirmButtonText: `OK`,
        confirmButtonColor: '#AB0404',
       })
        }
     } else {
        Swal.fire({
        title: 'Preenche todos os campos antes de continuar!',
        confirmButtonText: `OK`,
        confirmButtonColor: '#AB0404',
       })
     }
});

