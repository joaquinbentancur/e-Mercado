document.addEventListener("DOMContentLoaded", function () {
  let productID = PRODUCT_INFO_URL + window.localStorage.getItem("prodID") + EXT_TYPE;
  let commentsID = PRODUCT_INFO_COMMENTS_URL + window.localStorage.getItem("prodID") + EXT_TYPE;
  getJSONData(productID).then((resultado) => {
    if (resultado.status === "ok") {
      let product = resultado.data;

      showProduct(product);
    }
  });
  getJSONData(commentsID).then((resultado) => {
    if (resultado.status === "ok") {
      let comments = resultado.data;

      showComments(comments);
    }
  });

  /* Click para nuevo comentario */
  document.getElementById("send-new-commentary").addEventListener("click", function () {
    let newCommentText = document.getElementById("new-commentary-text").value;
    let valorEstrella = document.getElementById("number-of-stars").value;

    if (newCommentText != "" && (valorEstrella != "" && valorEstrella > 0 && valorEstrella < 6)) {
      /* Cargo la fecha y la hora del sistema*/
      let today = new Date();

      let date = today.getDate();
      let month = today.getMonth() + 1;
      let year = today.getFullYear();

      let currentDate = `${year}-${month}-${date}`;

      let hours = addZeroLeft(today.getHours());
      let minutes = addZeroLeft(today.getMinutes());
      let seconds = addZeroLeft(today.getSeconds());

      let currentTime = `${hours}:${minutes}:${seconds}`;

      let currentDateTime = currentDate + " " + currentTime; /* Variable con fecha y hora */

      let estrellaPositiva = '<span class="fa fa-star checked"></span>';
      let estrellaVacia = '<span class="fa fa-star"></span>';

      document.getElementById("comentarios").innerHTML += `
        <div class="comment-container">
        <p><span id="comment-user">${window.localStorage.getItem("usuario-ingresado")}</span> - ${currentDateTime} - ${estrellaPositiva.repeat(valorEstrella) + estrellaVacia.repeat(5 - valorEstrella)}</p>
    <p>${newCommentText}</p></div>`;
    }
  });
});

/* Función para ajustar la hora */
function addZeroLeft(num) {
  return num < 10 ? `0${num}` : num;
}

function showProduct(product) {
  let productName = document.getElementById("product-name");
  let productCost = document.getElementById("product-cost");
  let productDesc = document.getElementById("product-desc");
  let productCat = document.getElementById("product-cat");
  let productSoldCount = document.getElementById("product-soldCount");
  let crslIndicators = document.getElementById("carousel-indicators");
  let productImg = document.getElementById("product-img-crsl");
  let productRltd = document.getElementById("product-related");

  productName.innerHTML = product.name;
  productCost.innerHTML = product.currency + " " + product.cost;
  productDesc.innerHTML = product.description;
  productCat.innerHTML = product.category;
  productSoldCount.innerHTML = product.soldCount;

  productImg.innerHTML = `<div class="carousel-item active">
  <img src="${product.images[0]}" class="d-block w-100" alt="${product.name[0]}">
</div>`;
  for (let i = 1; i < product.images.length; i++) {
    let imagen = product.images[i];
    /* Hago el indicador adaptativo a la cantidad */
    crslIndicators.innerHTML += `
    <button type="button" data-bs-target="#carouselWithIndicators" data-bs-slide-to="${i}" 
    aria-label="Slide ${i+1}"></button>`;
    /* Agrego las otras imágenes a mostrar */
    productImg.innerHTML += `<div class="carousel-item">
    <img src="${imagen}" class="d-block w-100" alt="${product.name}">
  </div>`;
  }

  let rltdToAppend = "";
  for (let i = 0; i < product.relatedProducts.length; i++) { /* Recorro los productos relacionados */
    let prodRltd = product.relatedProducts[i];
    rltdToAppend += `
    <div onclick="setProdID(${prodRltd.id})" class="cursor-active">
    <img class="imagen-producto" src="${prodRltd.image}"</img>
    <p>${prodRltd.name}</p>
    </div>
      `;
  }
  productRltd.innerHTML = rltdToAppend;
}

function setProdID(id) {
  localStorage.setItem("prodID", id); /* Agrego onclick a la función previa para que pueda llamar setProdID() */
  window.location = "product-info.html"
}

function showComments(comments) {
  let commentsToAppend = "";
  let estrellaPositiva = '<span class="fa fa-star checked"></span>';
  let estrellaVacia = '<span class="fa fa-star"></span>';
  
  for (let i = 0; i < comments.length; i++) {
    let comentario = comments[i];
    commentsToAppend += `<div class="comment-container">
    <p><span id="comment-user">${comentario.user}</span> - ${comentario.dateTime
      } - ${estrellaPositiva.repeat(comentario.score) +
      estrellaVacia.repeat(5 - comentario.score)
      }</p>
    <p>${comentario.description}</div>`;
  }
  document.getElementById("comentarios").innerHTML = commentsToAppend;
}