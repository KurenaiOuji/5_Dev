const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $mensajeCompra = d.querySelector("#mensaje-compra");
const $carrito = d.querySelector("#carrito");
const $btnAdd = d.querySelectorAll("#btn-agregar");
const $loader = d.querySelector("#mensaje-loader");

let prodctosid = [];

async function obtenerDatosDeAPI() {
    try {
    let url = "https://fakestoreapi.com/products";
    let res = await fetch(url);

    if (!res.ok) {
        throw "Error al acceder a la API";
    }

    let json = await res.json();

    console.log(res, json);

    const $posts = document.querySelector("#prod");

    let html = "";

    json.forEach((el) => {
        /*html += `
        <article>
            <h3>${el.title}</h3>
            <p>${el.body}</p> 
            <h5>ID: ${el.id} - User: ${el.userId}</h5> 
        </article>
        `;*/
        html += 
        `
        <article
        class="producto"
        data-id="${el.id}"
        data-nombre="${el.title}"
        data-precio="${el.price}"
        >
        <h3>${el.title}</h3> <h4>$${el.price}</h4>
        <img src="${el.image}" alt="${el.title}" class="img-fluid w-50">
        <p>${el.description}</p>
        <button id="btn-agregar" class="btnid"
        data-id="${el.id}"
        data-nombre="${el.title}"
        data-precio="${el.price}">Agregar al carrito</button>
    </article>
        `;
    });

    $posts.innerHTML = html;
    } catch (error) {
    console.warn(error);
    }
}

d.addEventListener("click",function(e){
    if(!e.target.matches(".btnid")){
        
    }else{
        let prodcto= e.target;
        let nombre = prodcto.dataset.nombre;
        let id = prodcto.dataset.id;
        let precio = parseFloat(prodcto.dataset.precio);
        if(!prodctosid.includes(prodcto.dataset.id)){
        prodctosid.push(prodcto.dataset.id);
        const $itemCarrito = d.createElement("li");
        $itemCarrito.id = `lista${prodcto.dataset.id}`;
        $itemCarrito.innerHTML = `
                <h3>Nombre del artiuclo: ${nombre}</h3>
                <p>precio individual: $${precio}</p>
                <p>Cantidad:<div><button class="btnresta" data-id="${prodcto.dataset.id}" data-nombre="${nombre}" data-precio="${precio}">-</button><p id="cantidad${id}" data-cantidad="1">1</p><button class="btnsuma" data-id="${prodcto.dataset.id}" data-nombre="${nombre}" data-precio="${precio}">+</button></div>
                <p id="subto${id}">Subtotal: $${precio}</p>
                <button class="quitarcarrito" data-nombre="${nombre}" data-id="${prodcto.dataset.id}">Quitar del carrito</button>
                `;
                $listaCarrito.appendChild($itemCarrito);
        console.log(prodctosid);
        }else{
            let $itemcantidad = d.querySelector("#cantidad"+id);
            let itemcantidad = parseFloat($itemcantidad.getAttribute("data-cantidad"))
            itemcantidad++;
            $itemcantidad.setAttribute("data-cantidad",itemcantidad);
            $itemcantidad.innerText = `${itemcantidad}`;
            let subtotal = d.querySelector(`#subto${id}`);
            subtotal.innerText=`Subtotal: $`+itemcantidad*precio;
        }
        let totalActual = parseFloat($totalCarrito.innerText);
        $totalCarrito.innerText = (totalActual+precio).toFixed(2);
    }
});

d.addEventListener("click",function(e){
    if(e.target.matches(".btnsuma")){
        const $btnmas = e.target
        let id = $btnmas.dataset.id;
        let nombre = $btnmas.dataset.nombre;
        let precio = parseFloat($btnmas.dataset.precio);
        let $itemcantidad = d.querySelector("#cantidad"+id);
        let itemcantidad = parseFloat($itemcantidad.getAttribute("data-cantidad"))
        itemcantidad++;
        $itemcantidad.setAttribute("data-cantidad",itemcantidad);
        $itemcantidad.innerText = `${itemcantidad}`;
        let subtotal = d.querySelector(`#subto${id}`);
        console.log(subtotal);
        subtotal.innerText=`Subtotal: $`+itemcantidad*precio;
        let totalActual = parseFloat($totalCarrito.innerText);
        $totalCarrito.innerText = (totalActual+precio).toFixed(2);
    }
    if(e.target.matches(".btnresta")){
        const $btnmas = e.target
        let id = $btnmas.dataset.id;
        let nombre = $btnmas.dataset.nombre;
        let precio = parseFloat($btnmas.dataset.precio);
        let $itemcantidad = d.querySelector("#cantidad"+id);
        let itemcantidad = parseFloat($itemcantidad.getAttribute("data-cantidad"))
        itemcantidad--;
        $itemcantidad.setAttribute("data-cantidad",itemcantidad);
        $itemcantidad.innerText = `${itemcantidad}`;
        let subtotal = d.querySelector(`#subto${nombre}`);
        subtotal.innerText=`Subtotal: $`+itemcantidad*precio;
        let totalActual = parseFloat($totalCarrito.innerText);
        $totalCarrito.innerText = (totalActual-precio).toFixed(2);
        if(itemcantidad == 0){
            eliminar(id);
        }
        }
});

function eliminar(id){
    let liid = d.querySelector("#lista"+id);
    removeItemOnce(prodctosid,id);
    liid.remove();
}

function removeItemOnce(arr,value){
    var index = arr.indexOf(value);
    if(index > -1){
        arr.splice(index,1);
    }
    return arr;
}

d.addEventListener("click",function(e){
    if(!e.target.matches(".quitarcarrito")){
        return;
    }else{
        const $btnquitar = e.target;
        let idquitar = $btnquitar.dataset.id;
        let nombre = $btnquitar.dataset.nombre;
        let subtotal = d.querySelector(`#subto${idquitar}`);
        console.log(subtotal);
        let subtotal2 = subtotal.innerText.split("$")[1]
        console.log(subtotal2);
        let totalActual = parseFloat($totalCarrito.innerText);

        $totalCarrito.innerText = (totalActual-subtotal2).toFixed(2);
        eliminar(idquitar);
    }
});

$btnCompra.addEventListener("click", function(e){
    console.log($listaCarrito.children);
    if($listaCarrito.children.length > 0){
        //$mensajeCompra.classList.remove("hidden");
        $loader.classList.remove("hidden");
        setTimeout(()=>{
            $mensajeCompra.classList.remove("hidden");
            $loader.classList.add("hidden");
        },5000);
    }else{
        alert("El carrito está vacío, no se puede realizar la compra.");
    }
});

obtenerDatosDeAPI();