class Menu extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="container">
          <div class="titulo">
              <h2>M06 REP_05 - Restaurant</h2>
          </div>
  
          <div class="restaurante">
              <div class="platosDiv col-md-6">
                  <div class="primerPlatoDiv">
                      <div class="tituloDiv">
                          <h3>Primer Plato</h3>
                      </div>
                      <div class="cuerpoDiv">
                          <ul id="primerPlato"></ul>
                      </div>
                  </div>
                  <div class="segundoPlatoDiv">
                      <div class="tituloDiv">
                          <h3>Segundo Plato</h3>
                      </div>
                      <div class="cuerpoDiv">
                          <ul id="segundoPlato"></ul>
                      </div>
                  </div>
                  <div class="postresPlatoDiv">
                      <div class="tituloDiv">
                          <h3>Postres</h3>
                      </div>
                      <div class="cuerpoDiv">
                          <ul id="postresPlato"></ul>
                      </div>
                  </div>
              </div>
  
              <div class="bebidasDiv col-md-3">
                  <div class="tituloDiv">
                      <h3>Bebidas</h3>
                  </div>
                  <div class="cuerpoDiv">
                      <ul id="bebidasPlato" class="vertical-list"></ul>
                  </div>
              </div>
              <order-component class="col-md-3"></order-component>
          </div>
      </div>
    `;

    const primerPlatoList = this.querySelector("#primerPlato");
    const segundoPlatoList = this.querySelector("#segundoPlato");
    const postresPlatoList = this.querySelector("#postresPlato");
    const bebidasPlatoList = this.querySelector("#bebidasPlato");

    const platos = [
      {
        nombrePlato: "Ensalada César",
        imagen: "./img/EnsaladaCesar.png",
        precio: 12.5,
        alergenos: ["Gluten", "Lactosa"],
        categoria: "primero",
      },
      {
        nombrePlato: "Sopa de Tomate",
        imagen: "./img/SopaTomate.png",
        precio: 8.0,
        alergenos: ["Gluten"],
        categoria: "primero",
      },
      {
        nombrePlato: "Filete de Salmón",
        imagen: "./img/FileteSalmon.png",
        precio: 18.9,
        alergenos: ["Pescado"],
        categoria: "segundo",
      },
      {
        nombrePlato: "Lasaña de Verduras",
        imagen: "./img/LasañaVerduras.png",
        precio: 14.25,
        alergenos: ["Gluten", "Lácteos"],
        categoria: "segundo",
      },
      {
        nombrePlato: "Tiramisú",
        imagen: "./img/Tiramisu.png",
        precio: 9.5,
        alergenos: ["Gluten", "Lácteos"],
        categoria: "postre",
      },
      {
        nombrePlato: "Coulant de Chocolate",
        imagen: "./img/CoulantChocolate.png",
        precio: 10.75,
        alergenos: ["Gluten", "Lácteos"],
        categoria: "postre",
      },
      {
        nombrePlato: "Vino Tinto",
        imagen: "./img/VinoTinto.png",
        precio: 20.0,
        alergenos: [],
        categoria: "bebida",
      },
      {
        nombrePlato: "Agua Mineral",
        imagen: "./img/AguaMineral.png",
        precio: 3.0,
        alergenos: [],
        categoria: "bebida",
      },
    ];

    platos.forEach((plato) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <div class="card" style="width: 18rem;">
          <img src="${plato.imagen}" class="card-img-top" alt="${
        plato.nombrePlato
      }" width="286px" height="180px">
          <div class="card-body">
            <h5 class="card-title">${plato.nombrePlato}</h5>
            <p>Precio: ${plato.precio}</p>
            <p>Alergenos: ${plato.alergenos.join(", ")}</p>
            <div class="d-grid gap-2">
              <button class="btn btn-primary añadirMulta" data-nombre="${
                plato.nombrePlato
              }" data-precio="${
        plato.precio
      }" type="button">Añadir a la Multa</button>
            </div>
          </div>
        </div>
      `;

      switch (plato.categoria) {
        case "primero":
          primerPlatoList.appendChild(listItem);
          break;
        case "segundo":
          segundoPlatoList.appendChild(listItem);
          break;
        case "postre":
          postresPlatoList.appendChild(listItem);
          break;
        default:
          bebidasPlatoList.appendChild(listItem);
          break;
      }
    });

    this.addEventListener("click", (event) => {
      if (event.target.classList.contains("añadirMulta")) {
        const platoNombre = event.target.dataset.nombre;
        const platoPrecio = parseFloat(event.target.dataset.precio);
        const añadirMultaEvent = new CustomEvent("añadirMulta", {
          detail: { platoNombre, platoPrecio },
        });
        document.dispatchEvent(añadirMultaEvent);
      }
    });
  }
}

customElements.define("menu-component", Menu);

class Multa extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="multaDiv col-md-12">
        <div class="tituloDiv">
          <h3>La Multa</h3>
        </div>
        <div class="cuerpoDiv">
          <p>Total: <span id="total">0</span> €</p>
          <ul id="laMultaId" class="vertical-list"></ul>
        </div>
      </div>
    `;

    this.orderItemsContainer = this.querySelector("#laMultaId");
    this.totalElement = this.querySelector("#total");
    this.total = 0;

    document.addEventListener("añadirMulta", (event) => {
      const { platoNombre, platoPrecio } = event.detail;
      this.añadirMulta(platoNombre, platoPrecio);
    });

    this.addEventListener("click", (event) => {
      if (event.target.classList.contains("eliminarPlato")) {
        const precioPlato = parseFloat(event.target.dataset.precio);
        this.total -= precioPlato;
        this.totalElement.textContent = this.total.toFixed(2);
        event.target.closest("li").remove();
      }
    });
  }

  añadirMulta(platoNombre, platoPrecio) {
    this.total += platoPrecio;
    this.totalElement.textContent = this.total.toFixed(2);
    const orderItem = document.createElement("li");
    orderItem.setAttribute("nombrePlato", platoNombre);
    orderItem.setAttribute("precioPlato", platoPrecio);
    orderItem.innerHTML = `
      <div class="card border-primary mb-3" style="max-width: 18rem;">
        <div class="card-header">
        <h5>${platoNombre}</h5>
        </div>
        <div class="card-body text-primary">
          <p class="card-text">Precio: ${platoPrecio} €</p>
          <div class="d-grid gap-2">
            <button class="btn btn-danger eliminarPlato" data-precio="${platoPrecio}" type="button">Eliminar</button>
          </div>
        </div>
      </div>
    `;
    this.orderItemsContainer.appendChild(orderItem);
  }
}

customElements.define("order-component", Multa);
