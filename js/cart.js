let cartData = [];

document.addEventListener("DOMContentLoaded", function () {
  userDropbarMenu();

  let userCart = CART_INFO_URL + "25801" + EXT_TYPE

  getJSONData(userCart).then((resultado) => {
    if (resultado.status === "ok") {
      cartData = resultado.data.articles;

      showCart(cartData);
    }
  })
})

function showCart(cartData) {
  let listadoCarrito = document.getElementById("listadoCarrito");
  let plantillaArticulo = "";

  for (let i = 0; i < cartData.length; i++) {
    let prodCarrito = cartData[i];
    plantillaArticulo +=
      `<div class="col">
        <img src="${prodCarrito.image}" style="height: 50px;">
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
          </div>`
  }
  listadoCarrito.innerHTML = plantillaArticulo + "<hr>";
}

function changeCount(prodId, prodPosition) {
  let inputQ = document.getElementById(prodId).value
  if (inputQ >= 1) { /* Mínimo de 1 */
    cartData[prodPosition].count = inputQ;
  } else { /* O pasa a 1 */
    cartData[prodPosition].count = 1;
  }

  showCart(cartData)
}