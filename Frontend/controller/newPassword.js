import * as fetch from "./functions/fetch.js";
import * as root from "./functions/dark.light.js";

window.onload = function() {
    root.setColor();
    validator();
}
let email = sessionStorage.getItem("email");

document.getElementById("back").addEventListener("click", function() {
    window.location = "forgotPassword.html";
});

document.getElementById("submit").addEventListener("click", async function() {
    let route1 = 'users/newPassword/' + email;
    let newPwd = document.getElementById('newPassword').value;
    let confPwd = document.getElementById('confirmNewPassword').value;
    if (newPwd === confPwd) {
        fetch.putData(route1, {newPwd});
        window.location = "login.html";
        sessionStorage.removeItem("email"); 
    } else {
        Swal.fire({
          title: 'As palavras-passe não coincidem!',
          confirmButtonText: `OK`,
          confirmButtonColor: '#AB0404',
         })
      }
});