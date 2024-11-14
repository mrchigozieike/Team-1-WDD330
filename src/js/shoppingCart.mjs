import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
  <img
  src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
    </a>
    <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="remove-item" data-id="${item.Id}">&times;</span> <!-- "X" for remove -->
</li>`;

  return newItem;
}


export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key) || [];
    const htmlItems = cartItems.map((item) => cartItemTemplate(item)).join("");
    document.querySelector(this.parentSelector).innerHTML = htmlItems;

    // Add event listeners for "remove" action
    document.querySelectorAll(".remove-item").forEach((el) => {
      el.addEventListener("click", (event) => this.removeItem(event.target.dataset.id));
    });
  }

  removeItem(itemId) {
    let cartItems = getLocalStorage(this.key);
    cartItems = cartItems.filter((item) => item.Id !== itemId); // Remove the item with matching Id
    setLocalStorage(this.key, cartItems); // Update the local storage
    this.renderCartContents(); // Re-render the cart
  }
}