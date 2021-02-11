"use strict";
export { getData, putData, postData, deleteData };

// https://dmitripavlutin.com/javascript-fetch-async-await/

const urlBase = "https://58717807e0f449edb5fcb157313592f1.vfs.cloud9.us-east-1.amazonaws.com/"
// const urlBase = "https://660274fa4a8a48228a25454f70ccac83.vfs.cloud9.us-east-1.amazonaws.com/"
// const urlBase = "http://localhost:8080/"

async function getData(route) {
    const response = await fetch(urlBase + route);

    // if (!response.ok) {
    //     const message = `An error has occured: ${response.status}`;
    //     throw new Error(message);
    // }
    
    const data = await response.json();
    return data;
}


function postData(route, data) {
    console.log(urlBase + route)
    fetch(urlBase + route, {
        headers: { 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    }).then(function(response) {
        if (!response.ok) {
            console.log(response.status); //=> number 100–599
            console.log(response.statusText); //=> String
            console.log(response.headers); //=> Headers
            console.log(response.url); //=> String
            if (response.status === 409) {
                // alert("Duplicado!");
            }
            else {
                throw Error(response.statusText);
            }
        }
        else {
            // alert("Submetido com sucesso");
        }
    }).then(function(result) {
        console.log(result);
    }).catch(function(err) {
        // alert("Erro de submissão");
        console.error(err);
    });
}

function deleteData(route) {
    fetch(urlBase + route, {
            method: 'DELETE',
        })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))
}

function putData(route, data) {
    fetch(urlBase + route, {
        headers: { 'Accept': 'application/json',
            'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(data)
    }).then(function(response) {
        if (!response.ok) {
            console.log(response.status); //=> number 100–599
            console.log(response.statusText); //=> String
            console.log(response.headers); //=> Headers
            console.log(response.url); //=> String
        }
        else {
            // alert("Submetido com sucesso");
        }
    }).then(function(result) {
        console.log(result);
    }).catch(function(err) {
        // alert("Erro de submissão");
        console.error(err);
    });
}

