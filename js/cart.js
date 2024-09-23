let motos = [];

fetch("./js/motos.json")
.then(response => response.json())
.then(data => {
    productos = data;
    cargarmotos(motos)
})


const contenedorTarjetas = document.getElementById("productos-container");
const unidadesElement = document.getElementById("Unidades");
const precioElement = document.getElementById("Precio");
const carritoVacioElement = document.getElementById("Carrito-Vacio");
const totalesElement = document.getElementById("Totales");
const reiniciarCarritoElement = document.getElementById("Reiniciar");

function crearTarjetasProductosInicio() {
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("motos")) || [];
    console.log(productos);
    if (productos.length > 0) {
        productos.forEach((producto) => {
            const nuevaMoto = document.createElement("div");
            nuevaMoto.classList.add("tarjeta-producto");
            nuevaMoto.innerHTML = `
                <img src="./img/${producto.id}.jpg" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <div>
                    <button class="restar">-</button>
                    <span class="cantidad">${producto.cantidad}</span>
                    <button class="sumar">+</button>
                </div>
            `;
            contenedorTarjetas.appendChild(nuevaMoto);
            
            nuevaMoto.querySelector(".sumar").addEventListener("click", (e) => {
                agregarAlCarrito(producto);
                crearTarjetasProductosInicio(); // Actualiza las tarjetas
                actualizarTotales();
            });
            nuevaMoto.querySelector(".restar").addEventListener("click", (e) => {
                restarAlCarrito(producto);
                crearTarjetasProductosInicio(); // Actualiza las tarjetas
                actualizarTotales();
            });
        });
    }
}

function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem("motos"));
    let unidades = 0;
    let precio = 0;
    if (productos && productos.length>0) {
        productos.forEach(producto => {
            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        });
        unidadesElement.innerText = unidades;
        precioElement.innerText = precio;
    } else {
        unidadesElement.innerText = 0;
        precioElement.innerText = 0;
    }
    revisarMensajeVacio();
}

function revisarMensajeVacio() {
    const productos = JSON.parse(localStorage.getItem("motos")) || [];
    carritoVacioElement.classList.toggle("escondido",productos && productos.length>0);
    totalesElement.classList.toggle("escondido",!(productos && productos.length>0));
}


function reiniciarCarrito() {
    Swal.fire({
        title: "Usted esta seguro que desea Borrar carrito.",
        text: "Si indica Borrar perdera lo ingresado!",
        icon: "CUIDADO",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelarButtonColor: "#d33",
        confirmButtonText: "Borrar!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Borrado con Exito!",
            text: "Carrito Eliminado.",
            icon: "success"
          });
        }
      });
    
    localStorage.removeItem("motos");
    crearTarjetasProductosInicio(); // Actualiza las tarjetas
    actualizarTotales();
}

reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);


// Inicialización
crearTarjetasProductosInicio();
actualizarTotales();
revisarMensajeVacio();
