import * as fetch from "./functions/fetch.js"

window.onload = function() {
    const picture = document.getElementById("picture");
    let fotoAuditor = "";
    fotoAuditor += `
    <img id="profilePicture" height="100px" width="100px" class="mx-auto rounded-circle" src="./images/profile.png" alt="">
    `
    picture.innerHTML = fotoAuditor;
};


document.getElementById("editProfile").addEventListener("click", function() {
  window.location = "editProfile.html";  
});



let id_login = sessionStorage.getItem("id_login")


(async function() {
    let route = "users";
    let users = await fetch.getData(route);
    let person;
    
    for(const user of users){
    if(user.id_login == id_login){
    person = user;
    break;
    }
}

    document.getElementById("id").value = person.id_login;
    document.getElementById("email").value = person.email;
    document.getElementById("cargo").value = person.profile;
    
    if(person.profile == "Administrador") {
        route= "admins/"+id_login;
        let admin = await fetch.getData(route);
        
        document.getElementById("name").value = admin[0].name;
    } else {
        route= "audits/"+id_login;
        let audits = await fetch.getData(route);
        console.log(route)
        console.log(audits[0].name)
        document.getElementById("name").value = audits[0].name;
    }
})();

