let cartData = {};

document.addEventListener("DOMContentLoaded", function () {
    userDropbarMenu();
    let userCart = CART_INFO_URL + "25801" + EXT_TYPE

    getJSONData(userCart).then((resultado) => {
        if (resultado.status === "ok") {
            let cartData = resultado.data;

            showCart(cartData);
        }
    })
})

function showCart(cartData) {
    let listadoCarrito = document.getElementById("listadoCarrito");
    let plantillaArticulo = "";

    for (let i = 0; i < cartData.articles.length; i++) {
        let prodCarrito = cartData.articles[i];
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
            <input onkeyup="getProductQty(${prodCarrito.id,prodCarrito.currency,prodCarrito.unitCost})" id="${prodCarrito.id}q" type="number" min="1" value="${prodCarrito.count}" class="cart-qty-input">
          </div>
          <div class="col fw-bold">
            <p id="${prodCarrito.id}s">${prodCarrito.currency} ${((prodCarrito.unitCost) * (prodCarrito.count))}</p>
          </div>`
    }
    listadoCarrito.innerHTML = plantillaArticulo + "<hr>";
}

function getProductQty(prodId,prodCurrency,prodUnitCost) {
    let idQ = prodId+"q";
    let idS = prodId+"s";
    console.log(idQ);
    console.log(idS);
    let productQty = document.getElementById(idQ); /* Le quité .value */
    console.log(productQty);
    document.getElementById(idS).innerHTML = (prodCurrency)((prodUnitCost) * productQty);
}