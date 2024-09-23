function agregarAlCarrito(producto) {
     Toastify({
    text: "Producto agregado",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
        background: "linear-gradient(to right, #800000, #800000)",
        borderRadius: "2rem",
    },
    onClick: function () { } // Callback after click
}).showToast();

   
    let memoria = JSON.parse(localStorage.getItem("motos")) || [];
    console.log(memoria);



    let cuenta = 0;
    const indiceProducto = memoria.findIndex(moto => moto.id === producto.id);

    if (indiceProducto === -1) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        memoria.push(nuevoProducto);
        cuenta = 1;
    } else {
        memoria[indiceProducto].cantidad++;
        cuenta = memoria[indiceProducto].cantidad;
    }


    localStorage.setItem("motos", JSON.stringify(memoria));
    actualizarNumeroCarrito();

    return cuenta;
   

}

function restarAlCarrito(producto) {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #800000, #800000)",
            borderRadius: "2rem",
        },
        onClick: function () { } // Callback after click
    }).showToast();
    

    
    const memoria = JSON.parse(localStorage.getItem("motos"));
    const indiceProducto = memoria.findIndex(motos => motos.id === producto.id);
    if (memoria[indiceProducto].cantidad === 1) {
        memoria.splice(indiceProducto, 1);
    } else {
        memoria[indiceProducto].cantidad--;
    }
    localStorage.setItem("motos", JSON.stringify(memoria));
    actualizarNumeroCarrito()


}

/* Crea una nueva instancia del producto con cantidad 1 */
function getNuevoProductoParaMemoria(producto) {
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

const cuentaCarritoElement = document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito() {
    const memoria = JSON.parse(localStorage.getItem("motos"));
    const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
    cuentaCarritoElement.innerText = cuenta;
}

// Inicializa el número del carrito al cargar la página
actualizarNumeroCarrito();
