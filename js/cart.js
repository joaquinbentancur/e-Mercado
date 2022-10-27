let carritoLS = [];

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
    showCart(carritoLS);
  }
})

function showCart(carritoLS) {
  let listadoCarrito = document.getElementById("listadoCarrito");
  let plantillaArticulo = "";

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
          <input onchange="changeCount(${prodCarrito.id}, ${i})" id="${prodCarrito.id}" type="number" min=1 value="${prodCarrito.count}" class="cart-qty-input">
        </div>
        <div class="col fw-bold">
          <p>${prodCarrito.currency} ${((prodCarrito.unitCost) * (prodCarrito.count))}</p>
        </div>
      </div>`
  }
  listadoCarrito.innerHTML = plantillaArticulo + "<hr>";
}

function redirectProd(id){
  localStorage.setItem("prodID", id);
  location.href = "product-info.html";
}

function changeCount(prodId, prodPosition) {
  let inputQ = document.getElementById(prodId).value
  if (inputQ >= 1) { /* Mínimo de 1 */
    carritoLS[prodPosition].count = inputQ;
  } else { /* O pasa a 1 */
    carritoLS[prodPosition].count = 1;
  }
  window.localStorage.setItem("carritoLS", JSON.stringify(carritoLS)); /* Le agregué que se guardara el value en LS */
  showCart(carritoLS);
}