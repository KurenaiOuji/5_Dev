document.addEventListener("DOMContentLoaded", function() {
  const productContainer = document.getElementById('products');
  productContainer.classList.add('row', 'justify-content-center');

  const productsAPIFetch = fetch('https://fakestoreapi.com/products')
      .then(response => response.json());

  Promise.all([productsAPIFetch])
  .then(([data]) => {
      const productsAPI = data;

      // Validador
      if (!Array.isArray(productsAPI)) {
          throw new Error("No es un array válido");
      }

      // DOM
      productsAPI.forEach(product => {
          const productDiv = document.createElement('div');
          productDiv.classList.add('col-12', 'col-md-4', 'producto');
          productDiv.innerHTML = `
              <div class="box">
                  <img src="${product.image}" class="card-img-top" alt="${product.title}" style="max-height: 200px; object-fit: contain;">
                  <p class="text-primary" style="font-size: 20px;" data-price="${product.price}">$${product.price}</p>
                      <div class="botones, justify-content-center">
                          <button class="btn-restar" disabled>-</button>
                          <button class="btn-sumar">+</button>
                      </div>
                  <div class="card-body">
                      <h5 class="card-title" style="font-size: 25px;" data-id="${product.id}" data-title="${product.title}">${product.title}</h5>
                      <p class="card-text" style="font-size: 15px;">${product.description}</p>
                  </div>
              </div>
          `;

          productContainer.appendChild(productDiv);
      });
  })
  .catch(error => console.error('Error en la carga del API', error));
});