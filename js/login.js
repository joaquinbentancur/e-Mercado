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
            window.location.href = "e-commerce.html";
        }
    })
})