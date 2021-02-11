import * as fetch from "./functions/fetch.js"

document.getElementById("togglePassword").addEventListener("click", function() {
    if (document.getElementById("passInput").type === "password") {
        document.getElementById("passInput").type = "text";  
    } else {
        document.getElementById("passInput").type = "password";
    }
})

document.getElementById("submitInput").addEventListener("click", async function() {
    let route1 = 'users/login';
    let email = document.getElementById("mailInput").value;
    let route2 = 'users/'+email+'/profile/mail';
    let users = await fetch.getData(route2, {email});
    let password = document.getElementById("passInput").value;
    let data = {
        email,
        password
    }
    fetch.postData(route1, data);
    sessionStorage.setItem('id_user', users[0].id);
    sessionStorage.setItem('profile', users[0].profile);
    window.location = "mainPage.html";
}) 


