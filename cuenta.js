class OrderComponent extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <h2>Comanda</h2>
        <ul id="order-items"></ul>
        <p>Total: <span id="total">0</span>€</p>
      `;
      this.orderItemsContainer = this.querySelector('#order-items');
      this.totalElement = this.querySelector('#total');
      this.total = 0;
  
      document.addEventListener('add-to-order', event => {
        const { name, price } = event.detail;
        this.addToOrder(name, price);
      });
  
      this.addEventListener('click', event => {
        if (event.target.classList.contains('remove-item')) {
          const price = parseFloat(event.target.dataset.price);
          this.total -= price;
          this.totalElement.textContent = this.total.toFixed(2);
          event.target.parentElement.remove();
        }
      });
    }
  
    addToOrder(name, price) {
      this.total += price;
      this.totalElement.textContent = this.total.toFixed(2);
      const orderItem = document.createElement('order-item');
      orderItem.setAttribute('name', name);
      orderItem.setAttribute('price', price);
      orderItem.innerHTML = `
        <span>${name} - ${price.toFixed(2)}€</span>
        <button class="remove-item" data-price="${price}">Eliminar</button>
      `;
      this.orderItemsContainer.appendChild(orderItem);
    }
  }
  
  customElements.define('order-component', OrderComponent);
  