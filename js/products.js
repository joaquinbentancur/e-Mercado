let listaProductosActual = []; /* Ajusté el nombre de la variable en todo el código */
let nombreCategoria = "" /* Agregué esta variable para ajustar el nombre de la categoría del título */
const ORDEN_ASC_POR_PRECIO = "09";
const ORDEN_DESC_POR_PRECIO = "90";
const ORDEN_POR_PROD_CANT = "Cant.";
let criterioOrdenActual = undefined;
let minPrice = undefined;
let maxPrice = undefined;
let busqueda = undefined; /* Para la barra buscadora */


document.addEventListener("DOMContentLoaded", function () {
    let productCATID = PRODUCTS_URL + window.localStorage.getItem("catID") + EXT_TYPE;
    /* Declaré esta variable para concatenar el json con el catID del local storage */
    getJSONData(productCATID).then(resultado => {
        if (resultado.status == "ok") {
            listaProductosActual = resultado.data.products;
            nombreCategoria = resultado.data.catName;
            document.getElementById("categoria-mostrada").innerHTML += " " + nombreCategoria + "."; /* Agregué id para mostrar en título */;

            showProductsList()
        }
    })

    document.getElementById("rangeFilterPrice").addEventListener("click", function () { /* Obtengo valores min y max al filtrar */
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        }
        else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        }
        else {
            maxPrice = undefined;
        }

        showProductsList();
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () { /* Limpiar */
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";
        /* Se encarga de reiniciar los inputs y pone undefined a las variables de mín. y máx. */
        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });

    /* Agrego tres eventos de click con la función de ordenar más el parámetro como criterio */
    document.getElementById("sortAsc").addEventListener("click", function () {
        ordenarYMostrarProductos(ORDEN_ASC_POR_PRECIO); /* Estas constantes están declaradas al principio */
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        ordenarYMostrarProductos(ORDEN_DESC_POR_PRECIO);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        ordenarYMostrarProductos(ORDEN_POR_PROD_CANT);
    });

    document.getElementById("buscador").addEventListener("input", function () {
        busqueda = document.getElementById("buscador").value;
        showProductsList();
    }) /* Evento de escucha tipo input para establecer valor del buscador */
    
})

function ordenarYMostrarProductos(criterioOrden, listaProductos) {
    criterioOrdenActual = criterioOrden;

    if (listaProductos != undefined) {
        listaProductosActual = listaProductos;
    }

    listaProductosActual = ordenarProductos(criterioOrdenActual, listaProductosActual);

    showProductsList();
}

function ordenarProductos(criterio, lista) {
    let result = [];
    if (criterio === ORDEN_ASC_POR_PRECIO) {
        result = lista.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; } /* Cambio la propiedad name por cost */
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === ORDEN_DESC_POR_PRECIO) {
        result = lista.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === ORDEN_POR_PROD_CANT) {
        result = lista.sort(function (a, b) {
            let aCount = parseInt(a.soldCount); /* Cambio la propiedad productCount por soldCount */
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}


function showProductsList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < listaProductosActual.length; i++) {
        let product = listaProductosActual[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))) {
            /* Compara el costo del producto con el precio ingresado como mín y máx */
            if (busqueda == undefined || busqueda == "" || product.name.toLowerCase().includes(busqueda.toLowerCase())) {
                /* Agrego otro condicional que considera lo buscado con el evento de escucha input */

                htmlContentToAppend += `
            <div onclick="setCatID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `
            }
        }
    }
    document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
}