async function obtenerDatosDelJSON() {
    
  }
  
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
            <img src="${el.image}"/>
            <p>${el.price + "$"}</p> 
            <p>${el.description}</p> 
          </article>
        `;
      });
  
      $products.innerHTML = html;
    } catch (error) {
      console.warn(error);
    }
  }
  
  document.addEventListener("DOMContentLoaded", (e) => {
    obtenerDatosDelJSON();
    obtenerDatosDeAPI();
  });