const abrirCarrito = document.getElementById("abrir-carrito");
const carritoPopup = document.getElementById("carrito-popup");
const cerrarCarrito = document.getElementById("cerrar-carrito");

abrirCarrito.addEventListener("click", () => {
    carritoPopup.style.display = "flex";
});

cerrarCarrito.addEventListener("click", () => {
    carritoPopup.style.display = "none";
});

// Cerrar si se hace clic fuera del carrito
carritoPopup.addEventListener("click", (e) => {
    if (e.target === carritoPopup) {
        carritoPopup.style.display = "none";
    }
});




const contenedorProductos = document.getElementById('contenedor-productos');
const CarritoDeCompras = document.getElementById('carrito-de-compras');
const productos = [
    { id: 1, nombre: 'Manzana', precio: 1, cantidad: 10, imagen:'./img/manzana.jpg' },
    { id: 2, nombre: 'Pera', precio: 2, cantidad: 15, imagen:'./img/pera.jpg' },
    { id: 3, nombre: 'Naranja', precio: 3, cantidad: 20, imagen:'./img/naranja.jpg' },
    { id: 4, nombre: 'Sandía', precio: 4, cantidad: 5, imagen:'./img/sandia.jpg' },
    { id: 5, nombre: 'Papaya', precio: 5, cantidad: 8, imagen:'./img/papaya.jpg' },
];
function mostrarProductos() {
    contenedorProductos.innerHTML = '';


productos.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('producto');

    div.innerHTML = `
        <img src="${producto.imagen}">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <p>Cantidad disponible: ${producto.cantidad}</p>
        <button ${producto.cantidad === 0 ? 'disabled' : ''} 
            onclick="agregarAlCarrito(${producto.id})">
            Agregar al carrito
        </button> `;

    contenedorProductos.appendChild(div);
}   );
}
mostrarProductos();

let carrito = [];
function agregarAlCarrito(id) {
    const productoOriginal = productos.find(prod => prod.id === id);

    if (productoOriginal.cantidad > 0) {
        productoOriginal.cantidad--;
        const productoEnCarrito = carrito.find(prod => prod.id === id)
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({ ...productoOriginal, cantidad: 1 });
        }

        console.log ("Producto agregado al carrito", carrito);
            renderizarCarrito();
            mostrarProductos();
    } else {
        console.log("Producto agotado");
    }
}

function renderizarCarrito() {
    CarritoDeCompras.innerHTML = '';

    let totalGeneral = 0;

    carrito.forEach((item, index) => {   
        const div = document.createElement('div');
        div.classList.add('item-carrito');

        const subtotal = item.precio * item.cantidad;
        totalGeneral += subtotal;

       div.innerHTML = `
    <img src="${item.imagen}">
    <div>
        <h4>${item.nombre}</h4>
        <p>Precio: $${item.precio}</p>
        <p>Cantidad: ${item.cantidad}</p>
        <p>Subtotal: $${subtotal}</p>
        <button class="boton-eliminar" onclick="eliminarProducto(${index})">
            Eliminar producto
        </button>
    </div>
`;

        CarritoDeCompras.appendChild(div);
    });

    const elementoTotal = document.getElementById('total-carrito');
    elementoTotal.innerText = totalGeneral;
}

   function eliminarProducto(index){

    const productoEnCarrito = carrito[index];

    const productoOriginal = productos.find(
        prod => prod.id === productoEnCarrito.id
    );

    if (productoEnCarrito.cantidad > 1) {

        productoEnCarrito.cantidad--;   // quitamo un producto del carro
        productoOriginal.cantidad++;    // Devuelve 1 al stock

    } else {

        productoOriginal.cantidad++; 
        carrito.splice(index, 1);
    }


    renderizarCarrito();
    mostrarProductos();
}

function generarFactura() {
let subtotalGeneral = 0;
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        subtotalGeneral += subtotal;
    });
    const impuestoIVA = subtotalGeneral * 0.13;        // Iva del 13%
    const totalFactura = subtotalGeneral + impuestoIVA;   //Total final con IVA incluido
    alert(`Factura generada. Subtotal: ${subtotalGeneral}, Impuesto IVA: ${impuestoIVA}, Total: ${totalFactura}`);
}


const botonFactura = document.getElementById('boton-factura');
botonFactura.addEventListener('click', generarFactura);



