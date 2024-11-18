import { getLocalStorage, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
  // Retrieve the cart items from local storage
  const cartItems = getLocalStorage('so-cart'); // Retrieve from local storage without fallback

  // Check if cartItems is an array; if not, default to an empty array
  const itemsToRender = Array.isArray(cartItems) ? cartItems : [];

  // Generate HTML for each cart item and insert it into the DOM
  const htmlItems = itemsToRender.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  
  // Update the cart total after rendering the items
  updateCartTotal(itemsToRender);
}

function cartItemTemplate(item) {
  // Template for rendering individual cart items
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

function updateCartTotal(cartItems) {
  const cartFooter = document.querySelector('.cart-footer');
  const cartTotalElement = document.querySelector('.cart-total');

  if (cartItems.length > 0) {
    // Calculate the total by summing up the item prices multiplied by their quantities
    const total = cartItems.reduce(
      (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
      0
    );

    // Display the total
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;

    // Show the cart footer
    cartFooter.classList.remove('hide');
  } else {
    // Hide the cart footer if the cart is empty
    cartFooter.classList.add('hide');
  }
}

// Call renderCartContents on page load
renderCartContents();
