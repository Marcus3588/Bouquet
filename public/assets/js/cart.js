// Cart logic (add/remove/update items)
function updateCartDisplay() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('totalPrice');

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-bag"></i>
        <h3>Your cart is empty</h3>
        <p>Add some beautiful bouquets!</p>
        <a href="shop.html" style="color:#ff66b2;font-weight:bold;font-size:1.2rem;">Continue Shopping</a>
      </div>
    `;
    totalEl.textContent = '$0.00';
    return;
  }

  let total = 0;
  container.innerHTML = cart.map(item => {
    total += item.price * item.quantity;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="item-name">${item.name}</div>
        <div class="item-price">$${item.price.toFixed(2)}</div>
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
        <button onclick="removeItem(${item.id})" style="background:none;border:none;color:#ff3366;font-size:2rem;cursor:pointer;">×</button>
      </div>
    `;
  }).join('');

  totalEl.textContent = '$' + total.toFixed(2);
}

// Update quantity
window.updateQuantity = function(id, change) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
  updateAllCartCounts();
};

// Remove item
window.removeItem = function(id) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart = cart.filter(i => i.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
  updateAllCartCounts();
};

// Update floating cart badge + header count
function updateAllCartCounts() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const total = cart.reduce((sum, i) => sum + i.quantity, 0);
  document.querySelectorAll('.cart-count, .cart-count-badge, #floatingCartCount').forEach(el => {
    if (el) el.textContent = total || '0';
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartDisplay();
  updateAllCartCounts();
});