let carrito = {};

document.addEventListener("click", function (e) {
    // Sumar producto
    if (e.target.matches(".btn-sumar")) {
        const producto = e.target.closest(".producto");
        let id = producto.querySelector(".card-title").getAttribute("data-id");
        let title = producto.querySelector(".card-title").getAttribute("data-title");
        let price = parseFloat(producto.querySelector("[data-price]").getAttribute("data-price"));

        if (!carrito[id]) {
            carrito[id] = { title, price, cantidad: 0 };
        }

        carrito[id].cantidad++;
        actualizarCarrito();
        actualizarBotones();
    }

    // Restar producto
    if (e.target.matches(".btn-restar")) {
        const producto = e.target.closest(".producto");
        let id = producto.querySelector(".card-title").getAttribute("data-id");

        if (carrito[id]) {
            carrito[id].cantidad--;
            if (carrito[id].cantidad <= 0) {
                delete carrito[id];
            }
        }
        actualizarCarrito();
        actualizarBotones();
    }
});

// Actualizar el carrito
function actualizarCarrito() {
    const listaCarrito = document.querySelector("#lista-carrito");
    const totalCarrito = document.querySelector("#total-carrito");
    const btnCompra = document.querySelector("#btn-compra");
    listaCarrito.innerHTML = "";
    let total = 0;
    let tieneProductos = false;

    Object.keys(carrito).forEach((id) => {
        const item = carrito[id];
        const itemCarrito = document.createElement("li");
        itemCarrito.innerText = `${item.title} - ${item.cantidad} unidades - $${(item.price * item.cantidad).toFixed(2)}`;
        listaCarrito.appendChild(itemCarrito);
        total += item.price * item.cantidad;
        tieneProductos = true;
    });

    totalCarrito.innerText = total.toFixed(2);

    if (tieneProductos) {
        btnCompra.disabled = false;
    } else {
        btnCompra.disabled = true;
    }
}

// Actualizar botones de restar
function actualizarBotones() {
    document.querySelectorAll(".producto").forEach((producto) => {
        let id = producto.querySelector(".card-title").getAttribute("data-id");
        const btnRestar = producto.querySelector(".btn-restar");

        if (!carrito[id] || carrito[id].cantidad === 0) {
            btnRestar.disabled = true;
        } else {
            btnRestar.disabled = false;
        }
    });
}

// Proceso de compra
const $btnCompra = document.querySelector("#btn-compra");
const $loader = document.querySelector("#loader");
const $mensajeExito = document.querySelector("#mensaje-exito");

$btnCompra.addEventListener("click", function () {
    if ($btnCompra.disabled) return;

    // LOADER
    $loader.classList.remove("hidden");

    setTimeout(function () {
        $loader.classList.add("hidden");

        $mensajeExito.classList.remove("hidden");
        $mensajeExito.classList.add("show");

        setTimeout(function () {
            $mensajeExito.classList.remove("show");
            $mensajeExito.classList.add("hide");

            setTimeout(function () {
                $mensajeExito.classList.add("hidden");
                $mensajeExito.classList.remove("hide");
            }, 500);
        }, 5000);
    }, 5000);
});