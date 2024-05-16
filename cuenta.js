class OrderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <h2>La Multa: </h2>
        <ul id="comandaPlatos"></ul>
        <p>Total: <span id="total">0</span>€</p>
      `;
    this.orderItemsContainer = this.querySelector("#comandaPlatos");
    this.totalElement = this.querySelector("#total");
    this.total = 0;

    document.addEventListener("añadir-a-multa", (event) => {
      const { nombrePlato, precio } = event.detail;
      this.addToOrder(nombrePlato, precio);
    });

    this.addEventListener("click", (event) => {
      if (event.target.classList.contains("borrarPlato")) {
        const precio = parseFloat(event.target.dataset.precio);
        this.total -= precio;
        this.totalElement.textContent = this.total.toFixed(2);
        event.target.parentElement.remove();
      }
    });
  }

  addToOrder(nombrePlato, precio) {
    this.total += precio;
    this.totalElement.textContent = this.total.toFixed(2);
    const orderItem = document.createElement("comandaPlatos");
    orderItem.setAttribute("nombrePlato", nombrePlato);
    orderItem.setAttribute("precio", precio);
    orderItem.innerHTML = `
        <span>${nombrePlato} - ${precio.toFixed(2)}€</span>
        <button type="button" class="btn btn-danger borrarPlato" data-precio="${precio}>Eliminar</button>
      `;
    this.orderItemsContainer.appendChild(orderItem);
  }
}

customElements.define("order-component", OrderComponent);
