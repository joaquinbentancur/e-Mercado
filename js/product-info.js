document.addEventListener("DOMContentLoaded", function () {
  let productID =
    PRODUCT_INFO_URL + window.localStorage.getItem("prodID") + EXT_TYPE;
  let commentsID =
    PRODUCT_INFO_COMMENTS_URL +
    window.localStorage.getItem("prodID") +
    EXT_TYPE;
  getJSONData(productID).then((resultado) => {
    if (resultado.status === "ok") {
      let product = resultado.data;

      showProduct(product);
    }
  });
  getJSONData(commentsID).then((resultado) => {
    if (resultado.status === "ok") {
      let comments = resultado.data;
      console.log(comments);

      showComments(comments);
    }
  });
});

function showProduct(product) {
  let productName = document.getElementById("product-name");
  let productCost = document.getElementById("product-cost");
  let productDesc = document.getElementById("product-desc");
  let productCat = document.getElementById("product-cat");
  let productSoldCount = document.getElementById("product-soldCount");
  let productImg = document.getElementById("product-img");

  productName.innerHTML = product.name;
  productCost.innerHTML = product.currency + " " + product.cost;
  productDesc.innerHTML = product.description;
  productCat.innerHTML = product.category;
  productSoldCount.innerHTML = product.soldCount;

  let imgToAppend = "";
  for (let i = 0; i < product.images.length; i++) {
    let imagen = product.images[i];
    imgToAppend += `<img class="imagen-producto" src="${imagen}">
    `;
  }
  productImg.innerHTML = imgToAppend;
}

function showComments(comments) {
  let commentsToAppend = "";
  let estrellaPositiva = '<span class="fa fa-star checked"></span>';
  let estrellaVacia = '<span class="fa fa-star"></span>';
  for (let i = 0; i < comments.length; i++) {
    let comentario = comments[i];
    commentsToAppend += `<div class="comment-container">
    <p><span id="comment-user">${comentario.user}</span> - ${
      comentario.dateTime
    } - ${
      estrellaPositiva.repeat(comentario.score) +
      estrellaVacia.repeat(5 - comentario.score)
    }</p>
    <p>${comentario.description}</div>`;
  }
  document.getElementById("comentarios").innerHTML = commentsToAppend;
}
