document.addEventListener("DOMContentLoaded", function () {
    let email = document.getElementById("input-email");
    let password = document.getElementById("input-password");
    let validEmail = false
    let validPassword = false

    document.getElementById("input-ingresar").addEventListener("click", function () {
        window.localStorage.setItem("usuario-ingresado", email.value);/*  Acá guardo en el LS el usuario del login */
        document.getElementById("email-error").innerHTML = ""
        document.getElementById("password-error").innerHTML = ""
        validEmail = false
        validPassword = false
        if (email.value != "") {
            validEmail = true
        } else { document.getElementById("email-error").innerHTML = "Ingresa tu e-mail" }
        if (password.value != "") {
            validPassword = true
        } else { document.getElementById("password-error").innerHTML = "Ingresa tu contraseña" }
        if (validEmail == true && validPassword == true) {
            if (window.localStorage.getItem("carritoLS") === null) {
                /* Imitación del JSON del carrito del usuario 25801 con el producto precargado */
                let carritoLS = [
                    {
                        id: 50924,
                        name: "Peugeot 208",
                        count: 1,
                        unitCost: 15200,
                        currency: "USD",
                        image: "img/prod50924_1.jpg"
                    }
                ];
                window.localStorage.setItem("carritoLS", JSON.stringify(carritoLS));
            }
            window.location.href = "portada.html";
        }
    })
})

/* Luego en clase vimos que puedo usar un mismo booleano con true en lugar de uno para cada input con false.
En cada if alcanza con cambiar el booleano a false y verificar el booleano compartido como true, para así redirigir. */