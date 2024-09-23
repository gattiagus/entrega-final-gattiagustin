const contenedorTarjetas = document.getElementById("productos-container");

function crearTarjetasProductosInicio(productos) {
    productos.forEach(producto => {
        const nuevaMoto = document.createElement("div");
        nuevaMoto.classList = "tarjeta-producto";
        nuevaMoto.innerHTML = `
     <img src="./img/${producto.id}.jpg">
     <h3>${producto.nombre}</h3>
     <p>$${producto.precio}</p>
     <button>Agregar al carrito</button>`



        contenedorTarjetas.appendChild(nuevaMoto);
        nuevaMoto.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(producto))
    });
}

crearTarjetasProductosInicio(motos);