// index.js

class CartaComponent extends HTMLElement {
  constructor() {
    super();
    this.platos = [
      {
        nombrePlato: "Paella",
        imagen: "./img/paella.jpg",
        precio: 12,
        alergenos: "Gluten, Mariscos",
        descripcion: "Deliciosa paella con mariscos y arroz en su punto.",
      },
      {
        nombrePlato: "Paella",
        imagen: "./img/paella.jpg",
        precio: 12,
        alergenos: "Gluten, Mariscos",
      },
      {
        nombrePlato: "Tortilla de patatas",
        imagen: "./img/tortilla.jpg",
        precio: 8,
        alergenos: "Huevos, Lactosa",
      },
      {
        nombrePlato: "Gazpacho",
        imagen: "./img/gazpacho.jpg",
        precio: 6,
        alergenos: "Apio, Ajo",
      },
      {
        nombrePlato: "Jamón ibérico",
        imagen: "./img/jamon.jpg",
        precio: 15,
        alergenos: "",
      },
      {
        nombrePlato: "Pulpo a la gallega",
        imagen: "./img/pulpo.jpg",
        precio: 14,
        alergenos: "Moluscos, Ajo",
      },
      {
        nombrePlato: "Patatas bravas",
        imagen: "./img/patatas_bravas.jpg",
        precio: 7,
        alergenos: "Gluten, Ajo",
      },
      {
        nombrePlato: "Crema catalana",
        imagen: "./img/crema_catalana.jpg",
        precio: 5,
        alergenos: "Lactosa, Huevos",
      },
      {
        nombrePlato: "Flan",
        imagen: "./img/flan.jpg",
        precio: 4,
        alergenos: "Lactosa, Huevos",
      },
      {
        nombrePlato: "Tarta de chocolate",
        imagen: "./img/tarta_chocolate.jpg",
        precio: 6,
        alergenos: "Gluten, Lactosa",
      },
      {
        nombrePlato: "Vino tinto",
        imagen: "./img/vino_tinto.jpg",
        precio: 3,
        alergenos: "",
      },
      {
        nombrePlato: "Cerveza",
        imagen: "./img/cerveza.jpg",
        precio: 2,
        alergenos: "",
      },
      {
        nombrePlato: "Agua mineral",
        imagen: "./img/agua_mineral.jpg",
        precio: 1,
        alergenos: "",
      },
    ];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const cartaContainer = document.createElement("div");
    cartaContainer.classList.add("carta-container");

    this.platos.forEach((plato) => {
      const platItem = document.createElement("div");
      platItem.classList.add("plato");

      platItem.innerHTML = `
        <img src="${plato.imagen}" alt="${plato.nombrePlato}">
        <div class="info">
          <h3>${plato.nombrePlato}</h3>
          <p>${plato.descripcion}</p>
          <p><strong>Alergenos:</strong> ${plato.alergenos}</p>
          <button class="btn-add" data-nombre="${plato.nombrePlato}" data-imagen="${plato.imagen}" data-precio="${plato.precio}">Añadir al menú</button>
        </div>
      `;

      platItem.querySelector(".btn-add").addEventListener("click", () => {
        const event = new CustomEvent("plat-added", { detail: plato });
        this.dispatchEvent(event);
      });

      cartaContainer.appendChild(platItem);
    });

    this.appendChild(cartaContainer);
  }
}

customElements.define("carta-component", CartaComponent);
