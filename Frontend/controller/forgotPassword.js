import * as fetch from "./functions/fetch.js"

document.getElementById("back").addEventListener("click", function(){
    window.location = "login.html";
})

document.getElementById("continuar").addEventListener("click", async function(){
    let email = document.getElementById("confirmacao").value;
    let route1 = 'users/password/'+ email;
    let a = await fetch.getData(route1, {email});
    sessionStorage.setItem('email', email);
    window.location = "newPassword.html";
});

document.getElementById("submit").addEventListener("click", async function(){
    let email = document.getElementById("confirmacao").value;
    let route1 = 'users/password/'+ email;
    let a = await fetch.getData(route1, {email});
    sessionStorage.setItem('email', email);
    window.location = "newPassword.html";
});