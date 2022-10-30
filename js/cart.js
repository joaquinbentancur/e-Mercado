let carritoLS = [];
let tipoEnvio = 0;
let formCompra = document.getElementById("form-compra");
let formModal = document.getElementById("form-modal");
let checkPago = document.getElementById("check-tipo-pago"); /* Check oculto */

document.addEventListener("DOMContentLoaded", function () {
  userDropbarMenu();
  /* Para simplificar el desafío de la entrega 5, prescindí del JSON y
  usé el LocalStorage a modo de servidor donde guardar la información.
  
    let userCart = CART_INFO_URL + "25801" + EXT_TYPE
  
    getJSONData(userCart).then((resultado) => {
      if (resultado.status === "ok") {
        carritoLS = resultado.data.articles; */
  if (JSON.parse(window.localStorage.getItem("carritoLS")) != null) {
    carritoLS = JSON.parse(window.localStorage.getItem("carritoLS"));
  }

  showCart(carritoLS);
})

function showCart(carritoLS) {
  let listadoCarrito = document.getElementById("listadoCarrito");
  let plantillaArticulo = "";
  let subtotalFinal = 0;

  if (carritoLS.length === 0 || window.localStorage.getItem("carritoLS") === null) {
    document.getElementById("listadoCarrito").innerHTML = '<p class="text-center">¡Tu carrito no tiene artículos!</p>';
    document.getElementById("datos-de-compra").classList.add("d-none");
    return
  }

  document.getElementById("datos-de-compra").classList.remove("d-none");

  /* SI VACIO SI CON ALGO PA QUE FUNCIONE AL BORRAR */

  for (let i = 0; i < carritoLS.length; i++) {
    let prodCarrito = carritoLS[i];

    plantillaArticulo += /* Clickear la imagen redirige al producto */
      `<div class="row mb-2 border">
        <div class="col">
          <img onclick="redirectProd(${prodCarrito.id})" src="${prodCarrito.image}" style="height: 50px;" class="pointer">
          </img>
        </div>
        <div class="col">
          <p>${prodCarrito.name}</p>
        </div>
        <div class="col">
          <p>${prodCarrito.currency} ${prodCarrito.unitCost}</p>
        </div>
        <div class="col">
          <input onchange="changeCount(${prodCarrito.id}, ${i})" id="${prodCarrito.id}" type="number" min=1 value="${prodCarrito.count}" class="cart-qty-input" required>
        </div>
        <div class="col d-flex fw-bold">
          <p class="me-1">${prodCarrito.currency}</p>
          <p>${((prodCarrito.unitCost) * (prodCarrito.count))}</p>
        </div>
        <div class="col">
        <button onclick="deleteProd(${i})" type="button" class="btn btn-outline-danger"><i class="bi bi-trash-fill"></i></button>
        </div>
      </div>`

    if (prodCarrito.currency != "USD") {
      subtotalFinal += Math.round(((prodCarrito.unitCost) * (prodCarrito.count)) / 45); /* Fijo 41 como cambio a USD */
    } else {
      subtotalFinal += Math.round((prodCarrito.unitCost) * (prodCarrito.count))
    }
  }
  listadoCarrito.innerHTML = plantillaArticulo + "<hr>";

  document.getElementById("subtotalFinal").innerHTML = `USD ${subtotalFinal}`

  document.getElementById("costoEnvio").innerHTML = `USD ${Math.round(subtotalFinal * tipoEnvio)}`

  document.getElementById("costoFinal").innerHTML = `USD ${subtotalFinal + Math.round(subtotalFinal * tipoEnvio)}`
}

document.getElementById("tipo-de-envio").onclick = (element) => { /* Para usar el input radio seleccionado */
  if (element.target.value) {
    tipoEnvio = element.target.value;
    console.log(tipoEnvio);
    showCart(carritoLS);
  }
}

document.getElementById("pagoTarj").onclick = (element) => { /* Para usar el input radio seleccionado */
  let inputTarj = Array.from(document.querySelectorAll(".input-tarj"));
  let inputBanco = Array.from(document.querySelectorAll(".input-banco"));
  if (element.target.value) {
    for (let input of inputTarj) {
      input.removeAttribute("disabled", "");
    }
    for (let input of inputBanco) {
      input.setAttribute("disabled", "");
    }
    document.getElementById("formaPago").innerHTML = "Tarjeta de crédito";
  }
}

formCompra.addEventListener("submit", function (e) {
  e.preventDefault()
  formCompra.classList.add("was-validated");

  checkModal();

  if (formCompra.checkValidity() && formModal.checkValidity()) { /* Incluyo lo de showCart() */
    document.getElementById("success-alert").classList.remove("d-none");
  }
})

document.getElementById("pagoBanco").onclick = (element) => { /* Para usar el input radio seleccionado */
  let inputTarj = Array.from(document.querySelectorAll(".input-tarj"));
  let inputBanco = Array.from(document.querySelectorAll(".input-banco"));
  if (element.target.value) {
    for (let input of inputBanco) {
      input.removeAttribute("disabled", "");
    }
    for (let input of inputTarj) {
      input.setAttribute("disabled", "");
    }
    document.getElementById("formaPago").innerHTML = "Transferencia bancaria";
  }
}

function deleteProd(iBorrar) {
  console.log(carritoLS);
  carritoLS = carritoLS.slice(0, iBorrar).concat(carritoLS.slice(iBorrar + 1, carritoLS.length));
  console.log(carritoLS);
  window.localStorage.setItem("carritoLS", JSON.stringify(carritoLS));
  console.log(carritoLS);
  showCart(carritoLS);
}

function checkModal() {
  if (formModal.checkValidity()) {
    checkPago.checked = true;
  } else { !formModal.checkValidity() }
}

function redirectProd(id) {
  localStorage.setItem("prodID", id);
  location.href = "product-info.html";
}

function changeCount(prodID, prodPosition) {
  let inputQ = document.getElementById(prodID).value
  if (inputQ >= 1) { /* Mínimo de 1 */
    carritoLS[prodPosition].count = Number(inputQ);
  } else { /* O pasa a 1 */
    carritoLS[prodPosition].count = 1;
  }
  window.localStorage.setItem("carritoLS", JSON.stringify(carritoLS)); /* Le agregué que se guardara el value en LS */
  showCart(carritoLS);
}