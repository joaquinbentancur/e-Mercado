let infoUsuario = [];

document.addEventListener("DOMContentLoaded", function () {
    userDropbarMenu();
    /* Si tengo tiempo, crear una función que verifique lo siguiente y de dónde luego
    obtener otra información, como la de la verificación del usuario ingresado */
    if (window.localStorage.getItem("usuario-ingresado") === null) {
        location.href = "index.html"
    }

    /* Agrego verificación para la inf. de usuario*/
    if (JSON.parse(window.localStorage.getItem("infoUsuario")) != null) {
        infoUsuario = JSON.parse(window.localStorage.getItem("infoUsuario"));
    } else {
        infoUsuario = [
            {
                nombre1: "",
                nombre2: "",
                apellido1: "",
                apellido2: "",
                correo: window.localStorage.getItem("usuario-ingresado"),
                telefono: ""
            }
        ];
        window.localStorage.setItem("infoUsuario", JSON.stringify(infoUsuario));
    }

    /* Recorrer un array pa actualizar con innerHTML la inf de los HTML */
    let inputsUsuario = [
        "nombre1",
        "nombre2",
        "apellido1",
        "apellido2",
        "correo",
        "telefono"
    ]

    for (let i = 0; i < inputsUsuario.length; i++) {
        let itemHTML = inputsUsuario[i];
        document.getElementById(itemHTML).value = infoUsuario[0][itemHTML]; /* Para pasarlo como string a la variable */
    }

    document.getElementById("form-perfil").addEventListener("submit", function (e) {
        e.preventDefault();
        checkInputs()
        if (document.getElementById("form-perfil").checkValidity()) {
            infoUsuario[0].nombre1 = document.getElementById("nombre1").value;
            infoUsuario[0].nombre2 = document.getElementById("nombre2").value;
            infoUsuario[0].apellido1 = document.getElementById("apellido1").value;
            infoUsuario[0].apellido2 = document.getElementById("apellido2").value;
            infoUsuario[0].correo = document.getElementById("correo").value;
            infoUsuario[0].telefono = document.getElementById("telefono").value;
            console.log(infoUsuario);

            window.localStorage.setItem("infoUsuario", JSON.stringify(infoUsuario));

            document.getElementById("success-alert").classList.remove("d-none");
        } else {
            checkInputs()
        }
    })
})

function checkInputs() {
    if (document.getElementById("nombre1").value == "") {
        document.getElementById("nombre1").classList.add("is-invalid")
    } else {
        if (document.getElementById("nombre1").classList.remove("is-invalid"));
    }
    if (document.getElementById("apellido1").value == "") {
        document.getElementById("apellido1").classList.add("is-invalid")
    } else {
        if (document.getElementById("apellido1").classList.remove("is-invalid"));
    }
    if (document.getElementById("correo").value == "") {
        document.getElementById("correo").classList.add("is-invalid")
    } else {
        if (document.getElementById("correo").classList.remove("is-invalid"));
    }
}