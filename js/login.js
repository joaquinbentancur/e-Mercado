document.addEventListener("DOMContentLoaded", function () {
    let email = document.getElementById("input-email");
    let password = document.getElementById("input-password");
    let validEmail = false
    let validPassword = false

    document.getElementById("input-ingresar").addEventListener("click", function () {
        document.getElementById("email-error").innerHTML = ""
        document.getElementById("password-error").innerHTML = ""
        validEmail = false
        validPassword = false
        if (email.value != "") {
            validEmail = true
        }else{document.getElementById("email-error").innerHTML = "Ingresa tu e-mail"}
        if (password.value != "") {
            validPassword = true
        }else{document.getElementById("password-error").innerHTML = "Ingresa tu contraseña"}
        if (validEmail == true && validPassword == true){
            window.location.href = "portada.html";
        }
    })
})

/* Luego en clase vimos que puedo usar un mismo booleano con true en lugar de uno para cada input con false.
En cada if alcanza con cambiar el booleano a false y verificar el booleano compartido como true, para así redirigir. */