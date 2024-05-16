class OrderItemComponent extends HTMLElement {
    connectedCallback() {
      const name = this.getAttribute('name');
      const price = parseFloat(this.getAttribute('price'));
      this.innerHTML = `
        <div>
          <span>${name} - ${price.toFixed(2)}€</span>
          <button class="remove-item" data-price="${price}">Eliminar</button>
        </div>
      `;
    }
  }
  
  customElements.define('order-item', OrderItemComponent);
  