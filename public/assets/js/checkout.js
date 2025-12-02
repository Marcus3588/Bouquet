
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('checkoutForm');
  const orderItemsDiv = document.getElementById('orderItems');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  const emptyState = document.getElementById('emptyState');

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');

  if (cart.length === 0) {
    emptyState.style.display = 'block';
    form.style.display = 'none';
    return;
  }

  // Show order items
  let subtotal = 0;
  orderItemsDiv.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    return `<div class="summary-item">
      <span>${item.name} × ${item.quantity}</span>
      <span>$${(itemTotal).toFixed(2)}</span>
    </div>`;
  }).join('');

  const delivery = 9.99;
  const total = subtotal + delivery;

  subtotalEl.textContent = '$' + subtotal.toFixed(2);
  totalEl.textContent = '$' + total.toFixed(2);

  // FORM SUBMIT → GO TO CONFIRMATION
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Save order
    localStorage.setItem('lastOrder', JSON.stringify({
      cart: cart,
      total: total,
      timestamp: new Date().toISOString()
    }));

    // Clear cart
    localStorage.setItem('cart', JSON.stringify([]));

    // Update all cart counters
    document.querySelectorAll('.cart-count, .cart-count-badge, #floatingCartCount')
            .forEach(el => el && (el.textContent = '0'));

    // THIS IS THE LINE THAT ACTUALLY TAKES YOU TO CONFIRMATION
    window.location.href = 'confirmation.html';
  });
});