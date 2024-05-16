class OrderItemComponent extends HTMLElement {
  connectedCallback() {
    const nombrePlato = this.getAttribute("nombrePlato");
    const precio = parseFloat(this.getAttribute("precio"));
    this.innerHTML = `
        <div>
          <span>${nombrePlato} - ${precio.toFixed(2)}€</span>
          <button class="remove-item" data-precio="${precio}">Eliminar</button>
                 <button type="button" class="btn btn-danger borrarPlato" data-precio="${precio}>Eliminar</button>
      `;
  }
}

customElements.define("comandaPlatos", OrderItemComponent);
