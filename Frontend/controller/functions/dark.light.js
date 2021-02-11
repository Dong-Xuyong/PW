"use strict";
export { getTypeMode, setColor};
/* Estilo Padrão */
/*:root{*/
/*  --primary-color: #E7E7E7;*/
/*  --secondary-color: #AB0404;*/
/*  --shadow-color: #777;*/
/*  --font-color: #000000;*/
/*  --background-color: #FFFFFF;*/
/*  --white: #FFFFFF; */
/*  --links-color: #AB0404;*/
/*  --table-color: #f4f4f4;*/
/*  --grafic-color: #DEDEDE;*/
/*}*/
/*Estilo padrão para dark mode */
//  :root{
//     --primary-color: #FFFFFF;
//     --secondary-color: #AB0404;
//     --shadow-color:  #777;
//     --font-color: #FFFFFF;
//     --background-color:#3D3D3D;
//     --white: #FFFFFF;
//     --links-color: #FFFFFF;
//     --table-color: #363535;
//     --grafic-color: #DEDEDE;
//   }

function getTypeMode(type) {
    if (type) {
        //LightMode
        localStorage.setItem("primary-color", "#E7E7E7");
        localStorage.setItem("secondary-color", "#AB0404");
        localStorage.setItem("shadow-color", "#777");
        localStorage.setItem("font-color", "#000000");
        localStorage.setItem("background-color", "#FFFFFF");
        localStorage.setItem("white", "#FFFFFF");
        localStorage.setItem("links-color", "#AB0404");
        localStorage.setItem("table-color", "#f4f4f4");
        localStorage.setItem("grafic-color", "#DEDEDE");
    } else {
        // darkMode
        localStorage.setItem("primary-color", "#FFFFFF");
        localStorage.setItem("secondary-color", "#AB0404");
        localStorage.setItem("shadow-color", "#777");
        localStorage.setItem("font-color", "#FFFFFF");
        localStorage.setItem("background-color", "#3D3D3D");
        localStorage.setItem("white", "#FFFFFF");
        localStorage.setItem("links-color", "#FFFFFF");
        localStorage.setItem("table-color", "#363535");
        localStorage.setItem("grafic-color", "#DEDEDE");
    }
}


function setColor() {
    let primaryColor = localStorage.getItem("primary-color");
    let secondaryColor = localStorage.getItem("secondary-color");
    let shadowColor = localStorage.getItem("shadow-color");
    let fontColor = localStorage.getItem("font-color");
    let backgroundColor = localStorage.getItem("background-color");
    let white = localStorage.getItem("white");
    let linksColor = localStorage.getItem("links-color");
    let tableColor = localStorage.getItem("table-color");
    let graficColor = localStorage.getItem("grafic-color");

    let docStyle = document.querySelector(':root').style;
    
    docStyle.setProperty('--primary-color', primaryColor);
    docStyle.setProperty('--secondary-color', secondaryColor);
    docStyle.setProperty('--shadow-color', shadowColor);
    docStyle.setProperty('--font-color', fontColor);
    docStyle.setProperty('--background-color', backgroundColor);
    docStyle.setProperty('--white', white);
    docStyle.setProperty('--links-color', linksColor);
    docStyle.setProperty('--table-color', tableColor);
    docStyle.setProperty('--grafic-color', graficColor);
}

