class MenuComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="restaurante">
            <div class="comida col-md-6">
                <div class="primerPlato">
                    <h2>Primer Plato</h2>
                    <ul id="primerPlato"></ul>
                </div>
                <div class="segundoPlato">
                    <h2>Segundo Plato</h2>
                    <ul id="segundoPlato"></ul>
                </div>
                <div class="postre">
                    <h2>postres</h2>
                    <ul id="postres"></ul>
                </div>
            </div>
            <div class="listabebidass col-md-3">
                <div class="bebidass">
                    <h2>bebidass</h2>
                    <ul id="bebidass"></ul>
                </div>
            </div>
        </div>
    `;

    const primerPlatoList = this.querySelector("#primerPlato");
    const segundoPlatoList = this.querySelector("#segundoPlato");
    const postresList = this.querySelector("#postres");
    const begudesList = this.querySelector("#bebidass");

    const platos = [
      {
        nombrePlato: "Ensalada César",
        imagen: "./img/EnsaladaCesar.png",
        precio: 12.5,
        alergenos: ["Gluten", "Lactosa"],
        categoria: "primerPlato",
      },
      {
        nombrePlato: "Sopa de Tomate",
        imagen: "./img/SopaTomate.png",
        precio: 8.0,
        alergenos: ["Gluten"],
        categoria: "primerPlato",
      },
      {
        nombrePlato: "Carpaccio de Res",
        imagen: "./img/CarpaccioRes.png",
        precio: 15.75,
        alergenos: ["Lácteos"],
        categoria: "primerPlato",
      },
      {
        nombrePlato: "Filete de Salmón",
        imagen: "./img/FileteSalmon.png",
        precio: 18.9,
        alergenos: ["Pescado"],
        categoria: "segundoPlato",
      },
      {
        nombrePlato: "Lasaña de Verduras",
        imagen: "./img/LasañaVerduras.png",
        precio: 14.25,
        alergenos: ["Gluten", "Lácteos"],
        categoria: "segundoPlato",
      },
      {
        nombrePlato: "Pollo al Curry",
        imagen: "./img/PolloCurry.png",
        precio: 16.5,
        alergenos: ["Lácteos"],
        categoria: "segundoPlato",
      },
      {
        nombrePlato: "Tiramisú",
        imagen: "./img/Tiramisu.png",
        precio: 9.5,
        alergenos: ["Gluten", "Lácteos"],
        categoria: "postres",
      },
      {
        nombrePlato: "Coulant de Chocolate",
        imagen: "./img/CoulantChocolate.png",
        precio: 10.75,
        alergenos: ["Gluten", "Lácteos"],
        categoria: "postres",
      },
      {
        nombrePlato: "Frutas de Temporada",
        imagen: "./img/FrutasTemporada.png",
        precio: 7.0,
        alergenos: [],
        categoria: "postres",
      },
      {
        nombrePlato: "Vino Tinto",
        imagen: "./img/VinoTinto.png",
        precio: 20.0,
        alergenos: [],
        categoria: "bebidas",
      },
      {
        nombrePlato: "Agua Mineral",
        imagen: "./img/AguaMineral.png",
        precio: 3.0,
        alergenos: [],
        categoria: "bebidas",
      },
      {
        nombrePlato: "Refresco de Limón",
        imagen: "./img/RefrescoLimon.png",
        precio: 4.5,
        alergenos: ["Gluten"],
        categoria: "bebidas",
      },
    ];

    platos.forEach((Plato) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
          <div>
            <img src="${Plato.imagen}" alt="${Plato.nombrePlato}" width="100">
            <h3>${Plato.nombrePlato}</h3>
            <p>Preu: ${Plato.precio}€</p>
            <p>Al·lèrgens: ${Plato.alergenos.join(", ")}</p>
            <button class="add-to-order" data-nombrePlato="${
              Plato.nombrePlato
            }" data-precio="${Plato.precio}">Afegir a la comanda</button>
          </div>
        `;

      switch (Plato.categoria) {
        case "primerPlato":
          primerPlatoList.appendChild(listItem);
          break;
        case "segundoPlato":
          segundoPlatoList.appendChild(listItem);
          break;
        case "postres":
          postresList.appendChild(listItem);
          break;
        case "bebidas":
          begudesList.appendChild(listItem);
          break;
        default:
          break;
      }
    });

    this.addEventListener("click", (event) => {
      if (event.target.classList.contains("add-to-order")) {
        const nombrePlato = event.target.dataset.nombrePlato;
        const precio = parseFloat(event.target.dataset.precio);
        const addToOrderEvent = new CustomEvent("add-to-order", {
          detail: { nombrePlato, precio },
        });
        document.dispatchEvent(addToOrderEvent);
      }
    });
  }
}

customElements.define("menu-component", MenuComponent);
