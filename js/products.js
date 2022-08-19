let listaAutos = [];

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCT_AUTOS).then(resultado => {
        if (resultado.status == "ok") {
                listaAutos = resultado.data.products;
            console.log(listaAutos);
            showProductsList()
        }
    })
})



function showProductsList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < listaAutos.length; i++) {
        let category = listaAutos[i];

        htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name} - ${category.currency} ${category.cost}</h4>
                            <small class="text-muted">${category.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `
        document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
    }
}