let palabras = [
  {
    nombrePlato: "Paella",
    imagen: "./img/SagradaFamilia.jpg",
    precio: 12,
    alergenos: "Gluten, Mariscos",
  },
  {
    nombrePlato: "Tortilla de patatas",
    imagen: "./img/SagradaFamilia.jpg",
    precio: 8,
    alergenos: "Gluten, Marisc ",
  },
  {
    nombrePlato: "Gazpacho",
    imagen: "./img/SagradaFamilia.jpg",
    precio: 6,
    alergenos: "Gluten, Marisc ",
  },
  {
    nombrePlato: "Jamón ibérico",
    imagen: "./img/SagradaFamilia.jpg",
    precio: 15,
    alergenos: "Gluten, Marisc ",
  },
  {
    nombrePlato: "Pulpo a la gallega",
    imagen: "./img/SagradaFamilia.jpg",
    precio: 14,
    alergenos: "Gluten, Marisc ",
  },
  {
    nombrePlato: "Patatas bravas",
    imagen: "./img/SagradaFamilia.jpg",
    precio: 7,
    alergenos: "Gluten, Marisc ",
  },
  {
    nombrePlato: "Croquetas",
    imagen: "./img/SagradaFamilia.jpg",
    precio: 9,
    alergenos: "Gluten, Marisc ",
  },
  {
    nombrePlato: "Calamares a la romana",
    imagen: "./img/SagradaFamilia.jpg",
    precio: 10,
    alergenos: "Gluten, Marisc ",
  },
  {
    nombrePlato: "Gambas al ajillo",
    imagen: "./img/SagradaFamilia.jpg",
    precio: 13,
    alergenos: "Gluten, Marisc ",
  },
  {
    nombrePlato: "Salmorejo",
    imagen: "./img/SagradaFamilia.jpg",
    precio: 6,
    alergenos: "Gluten, Marisc ",
  },
  {
    nombrePlato: "Fabada asturiana",
    imagen: "./img/SagradaFamilia.jpg",
    precio: 11,
    alergenos: "Gluten, Marisc ",
  },
  {
    nombrePlato: "Crema catalana",
    imagen: "./img/SagradaFamilia.jpg",
    precio: 5,
    alergenos: "Gluten, Marisc ",
  },
];

// Component de la Carta
class CartaComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div>
          <h2>Carta</h2>
          <ul id="plats">
            <!-- Aquí s'afegiran els plats dinàmicament -->
          </ul>
        </div>
      `;
    this.renderPlats();
  }

  renderPlats() {
    const plats = [
      {
        nom: "Plat 1",
        imatge: "plat1.jpg",
        preu: 10,
        alergens: ["Gluten", "Lactosa"],
      },
      // Més plats...
    ];

    const platsList = this.querySelector("#plats");
    plats.forEach((plat) => {
      const platItem = document.createElement("li");
      platItem.innerHTML = `
          <h3>${plat.nom}</h3>
          <img src="${plat.imatge}" alt="${plat.nom}">
          <p>Preu: ${plat.preu}€</p>
          <p>Alergens: ${plat.alergens.join(", ")}</p>
          <button class="afegir-plat" data-nom="${plat.nom}" data-imatge="${
        plat.imatge
      }" data-preu="${plat.preu}">Afegir a comanda</button>
        `;
      platsList.appendChild(platItem);
    });
  }

  // Aquest mètode s'activa quan es fa clic en el botó "Afegir a comanda"
  afegirAComanda(event) {
    const platSeleccionat = {
      nom: event.target.dataset.nom,
      imatge: event.target.dataset.imatge,
      preu: event.target.dataset.preu,
    };
    // Disparem un event personalitzat per enviar la informació del plat seleccionat
    this.dispatchEvent(
      new CustomEvent("platAfegit", { detail: platSeleccionat })
    );
  }

  constructor() {
    super();
    this.addEventListener("click", this.afegirAComanda);
  }
}

customElements.define("carta-component", CartaComponent);

// Component de la Comanda
class ComandaComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div>
          <h2>Comanda</h2>
          <ul id="plats-comanda">
            <!-- Aquí s'afegiran els plats seleccionats dinàmicament -->
          </ul>
          <p>Total: <span id="total">0</span>€</p>
        </div>
      `;
    this.total = 0;
    this.platsSeleccionats = [];
    this.renderPlatsComanda();
  }

  renderPlatsComanda() {
    const platsComanda = this.querySelector("#plats-comanda");
    platsComanda.innerHTML = "";
    this.platsSeleccionats.forEach((plat) => {
      const platComanda = document.createElement("li");
      platComanda.textContent = `${plat.nom} x ${plat.quantitat}`;
      platsComanda.appendChild(platComanda);
    });
    this.actualitzarTotal();
  }

  actualitzarTotal() {
    const totalElement = this.querySelector("#total");
    totalElement.textContent = this.total;
  }

  // Aquest mètode s'activa quan es rep l'event "platAfegit" de la Carta
  platAfegit(event) {
    const platSeleccionat = event.detail;
    const platJaAfegit = this.platsSeleccionats.find(
      (plat) => plat.nom === platSeleccionat.nom
    );
    if (platJaAfegit) {
      platJaAfegit.quantitat++;
    } else {
      this.platsSeleccionats.push({ ...platSeleccionat, quantitat: 1 });
    }
    this.total += platSeleccionat.preu;
    this.renderPlatsComanda();
  }

  constructor() {
    super();
    this.addEventListener("platAfegit", this.platAfegit);
  }
}

customElements.define("comanda-component", ComandaComponent);

// Component dels Plats de la Comanda
class PlatComandaComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div>
          <h3>${this.nom} x ${this.quantitat}</h3>
          <button class="incrementar">+</button>
          <button class="decrementar">-</button>
        </div>
      `;
    this.querySelector(".incrementar").addEventListener("click", () => {
      this.quantitat++;
      this.dispatchEvent(
        new CustomEvent("quantitatCanviada", {
          detail: { nom: this.nom, quantitat: this.quantitat },
        })
      );
      this.render();
    });
    this.querySelector(".decrementar").addEventListener("click", () => {
      if (this.quantitat > 0) {
        this.quantitat--;
        this.dispatchEvent(
          new CustomEvent("quantitatCanviada", {
            detail: { nom: this.nom, quantitat: this.quantitat },
          })
        );
        this.render();
      }
    });
  }

  render() {
    this.querySelector("h3").textContent = `${this.nom} x ${this.quantitat}`;
  }

  get nom() {
    return this.getAttribute("nom");
  }

  get quantitat() {
    return parseInt(this.getAttribute("quantitat"));
  }

  set quantitat(value) {
    this.setAttribute("quantitat", value);
  }
}

customElements.define("plat-comanda-component", PlatComandaComponent);
