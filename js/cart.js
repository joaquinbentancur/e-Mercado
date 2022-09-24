document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("usuario-ingresado").innerHTML = `
    ${window.localStorage.getItem("usuario-ingresado")}
    `;

    document.getElementById("log-out").addEventListener("click", function () {
        localStorage.removeItem("usuario-ingresado")
    });
})