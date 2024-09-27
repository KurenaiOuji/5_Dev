const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $mensajeCompra = d.querySelector("#mensaje-compra");
const $carrito = d.querySelector("#carrito");
const $loader = d.querySelector("#loader");
const $exitloader = d.querySelector(".float-bg");
const $btnmas = d.querySelectorAll("#mas");
const $btnmenos = d.querySelectorAll("#menos");

$btnmas.forEach((item) => {
  item.addEventListener('click', () => {
    const $producto = item.parentElement;
    let nombre = $producto.getAttribute("data-nombre");
    let precio = parseFloat($producto.getAttribute("data-precio"));
  
    const $itemCarrito = d.createElement("li");
    $itemCarrito.innerText = `${nombre} - $${precio}`;
    $itemCarrito.classList.add("article");
    $itemCarrito.classList.add(nombre);
  
    $listaCarrito.appendChild($itemCarrito);
  
    let totalActual = parseFloat($totalCarrito.innerText);
    $totalCarrito.innerText = (totalActual + precio).toFixed(2);
  })
});

$btnmenos.forEach((item) => {
  item.addEventListener('click', () => {
    const $producto = item.parentElement;
    let nombre = $producto.getAttribute("data-nombre");
    let precio = parseFloat($producto.getAttribute("data-precio"));
    const $productos = d.querySelectorAll(".article");
     
    for (var i = 0; i < $productos.length; ++i) {
      let article = $productos[i];
      if (article.classList.contains(nombre)){
        article.remove();
        let totalActual = parseFloat($totalCarrito.innerText);
        $totalCarrito.innerText = (totalActual - precio).toFixed(2);
        break;
      }
    }
  })
});

/*d.addEventListener("click", function (e) {
  if (!e.target.matches(".producto")) {
    return false;
  }

  //console.log(e);
  const $producto = e.target;
  let nombre = $producto.getAttribute("data-nombre");
  let precio = parseFloat($producto.getAttribute("data-precio"));

  const $itemCarrito = d.createElement("li");
  $itemCarrito.innerText = `${nombre} - $${precio}`;

  $listaCarrito.appendChild($itemCarrito);

  let totalActual = parseFloat($totalCarrito.innerText);
  $totalCarrito.innerText = (totalActual + precio).toFixed(2);
});*/

/*$listaCarrito.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    const $item = e.target;
    $item.remove();

    let precio = parseFloat($item.innerText.split("- $")[1]);
    //console.log($item.innerText.split("- $"));

    let totalActual = parseFloat($totalCarrito.innerText);
    $totalCarrito.innerText = (totalActual - precio).toFixed(2);
  }
});*/

$btnCompra.addEventListener("click", function (e) {
  console.log($listaCarrito.children);
  if ($listaCarrito.children.length > 0) {
    $mensajeCompra.classList.remove("hidden");
    let i = 5
    let countdownTimer = setInterval(function() {
        i = i - 1;
        if (i <= 0) {
            clearInterval(countdownTimer);
            $loader.classList.remove("loader")
            $loader.textContent = "¡Compra realizada con exito!"
            $exitloader.classList.add("exit")
        }
    }, 1000);
  } else {
    alert("Carrito Vacío");
  }
});

$exitloader.addEventListener("click",function (e) {
  if ($exitloader.classList.contains("exit")){
    $mensajeCompra.classList.add("hidden");
    $exitloader.classList.remove("exit");
  }
});