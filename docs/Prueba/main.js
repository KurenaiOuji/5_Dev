// Variables de acceso a los elementos del DOM
const d = document;
const carrito = []; // Array para almacenar los productos agregados al carrito
const $productos = d.querySelector("#productos"); // Sección de productos
const $listaCarrito = d.querySelector("#lista-carrito"); // Contenedor donde se mostrarán los productos del carrito
const $totalCarrito = d.querySelector("#total-carrito"); // Elemento que muestra el total del carrito
const $btnComprar = d.querySelector("#btn-compra"); // Botón para realizar la compra
const $loading = d.querySelector("#loading"); // Indicador de carga al momento de realizar la compra
const $mensajeCompra = d.querySelector("#mensaje-compra"); // Mensaje que aparece tras completar la compra

async function obtenerDatosDeAPI() {
  try {
    let url = "https://fakestoreapi.com/products";
    let res = await fetch(url);

    if (!res.ok) {
      throw "Error al acceder a la API";
    }

    let json = await res.json();

    console.log(res, json);

    const $products = document.querySelector("#products");

    let html = "";

    json.forEach((el) => {
      html += `
        <article>
          <p>${el.title}</p>
          <img src="${el.image}" alt="${el.title}" class="img-fluid w-50">
          <p>${el.description}</p> 
          <p>${el.price + "$"}</p> 
          <button id="btn-agregar" class="btnid"
          <p>Agreagar al Carrito</p>
        </article>
      `;
    });

    $products.innerHTML = html;
  } catch (error) {
    console.warn(error);
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  obtenerDatosDeAPI();
});

// Función para actualizar el contenido del carrito en la interfaz
function actualizarCarrito() {
  $listaCarrito.innerHTML = ""; // Limpiar el contenido anterior del carrito
  let total = 0; // Variable para calcular el total del carrito

  carrito.forEach((item) => {
    total += item.precio * item.cantidad; // Calcular el subtotal de cada producto

    // Crear un elemento HTML para mostrar cada producto en el carrito
    const $carritoItem = d.createElement("div");
    $carritoItem.classList.add("carrito-item");
    $carritoItem.innerHTML = `
    <h3>${item.nombre} - $${item.precio}</h3>
    <p>Cantidad: 
        <button class="disminuir-cantidad" data-id="${
          item.id
        }">-</button> 
        ${item.cantidad} 
        <button class="aumentar-cantidad" data-id="${item.id}">+</button>
    </p>
    <p class="carrito-item-total">Subtotal: $${
      item.precio * item.cantidad
    }</p>
    <button class="eliminar-item" data-id="${
      item.id
    }">Quitar del Carrito</button>
`;
    $listaCarrito.appendChild($carritoItem); // Agregar el producto al DOM
  });

  // Actualizar el total del carrito en la interfaz
  $totalCarrito.innerText = total.toFixed(2);

  // Mostrar/ocultar el botón de compra según haya productos o no en el carrito
  $btnComprar.classList.toggle("hidden", carrito.length === 0);
}

// Función para agregar un producto al carrito
function agregarProductoCarrito(id, nombre, precio) {
  // Verificar si el producto ya existe en el carrito
  const productoExistente = carrito.find((item) => item.id === id);

  if (productoExistente) {
    // Si existe, aumentar su cantidad
    productoExistente.cantidad++;
  } else {
    // Si no existe, agregar un nuevo producto al carrito con cantidad inicial 1
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }

  actualizarCarrito(); // Actualizar la interfaz
}

// Función para eliminar un producto del carrito
function eliminarProductoCarrito(id) {
  // Buscar el índice del producto en el array del carrito
  const indiceProducto = carrito.findIndex((item) => item.id === id);

  if (indiceProducto > -1) {
    // Eliminar el producto del array del carrito
    carrito.splice(indiceProducto, 1);
  }

  actualizarCarrito(); // Actualizar la interfaz
}

// Función para aumentar o disminuir la cantidad de un producto en el carrito
function cambiarCantidadProducto(id, unidad) {
  // Buscar el producto en el array del carrito
  const producto = carrito.find((item) => item.id === id);

  if (producto) {
    // Ajustar la cantidad del producto
    producto.cantidad += unidad;

    // Si la cantidad es menor o igual a 0, eliminar el producto del carrito
    if (producto.cantidad <= 0) {
      eliminarProductoCarrito(id);
    } else {
      actualizarCarrito(); // Si no, actualizar el carrito
    }
  }
}

// Evento que escucha los clicks en los productos
$productos.addEventListener("click", (e) => {
  // Verificar si el click fue en el botón "Agregar al Carrito"
  if (!e.target.classList.contains("agregar-carrito")) {
    return false;
  }

  // Obtener los datos del producto desde los atributos data
  const $producto = e.target.closest(".producto");
  let id = parseInt($producto.dataset.id);
  let nombre = $producto.dataset.nombre;
  let precio = parseFloat($producto.dataset.precio);

  // Agregar el producto al carrito
  agregarProductoCarrito(id, nombre, precio);
});

// Evento que escucha los clicks en los elementos del carrito
$listaCarrito.addEventListener("click", (e) => {
  let id = parseInt(e.target.dataset.id); // Obtener el ID del producto clickeado

  // Verificar si el click fue para eliminar el producto
  if (e.target.classList.contains("eliminar-item")) {
    eliminarProductoCarrito(id);
  }
  // Verificar si el click fue para aumentar la cantidad
  else if (e.target.classList.contains("aumentar-cantidad")) {
    cambiarCantidadProducto(id, 1);
  }
  // Verificar si el click fue para disminuir la cantidad
  else if (e.target.classList.contains("disminuir-cantidad")) {
    cambiarCantidadProducto(id, -1);
  }
});

// Evento para procesar la compra cuando se presiona el botón "Comprar"
$btnComprar.addEventListener("click", (e) => {
  // Mostrar el indicador de carga
  $loading.classList.remove("hidden");

  // Simular el procesamiento de la compra con un retraso de 5 segundos
  setTimeout(() => {
    alert(
      `Gracias por tu compra. El total es $${$totalCarrito.innerText}`
    );

    // Vaciar el carrito y actualizar la interfaz
    carrito.length = 0;
    actualizarCarrito();

    // Ocultar el indicador de carga y mostrar el mensaje de compra realizada
    $loading.classList.add("hidden");
    $mensajeCompra.classList.remove("hidden");

    // Ocultar el mensaje de compra después de 3 segundos
    setTimeout(() => {
      $mensajeCompra.classList.add("hidden");
    }, 3000);
  }, 5000);
});
