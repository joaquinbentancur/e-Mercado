document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    document.getElementById("usuario-ingresado").innerHTML = `
    <p class="nav-link">${window.localStorage.getItem("usuario-ingresado")}</p>
    `/* Inserto el HTML recuperando el usuario del local storage, 
    en un p con clase la misma clase que los otros items de cabecera para compartir estilo. */
});