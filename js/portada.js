document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    document.getElementById("usuario-ingresado").innerHTML = `
    ${window.localStorage.getItem("usuario-ingresado")}
    `;/* Inserto el HTML recuperando el usuario del local storage. */

    document.getElementById("log-out").addEventListener("click", function () {
        localStorage.removeItem("usuario-ingresado")
    });
});