document.addEventListener('DOMContentLoaded', () => {
  const productsContainer = document.getElementById('productsContainer');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Load products from JSON
  fetch('/data/products.json')
    .then(res => res.json())
    .then(products => {
      // Render all products initially
      renderProducts(products);

      // Filter logic
      filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          // Update active button
          filterButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const filter = btn.dataset.filter;
          if (filter === 'all') {
            renderProducts(products);
          } else {
            const filtered = products.filter(p => 
              p.occasion && p.occasion.toLowerCase().includes(filter)
            );
            renderProducts(filtered);
          }
        });
      });
    });

  function renderProducts(products) {
    productsContainer.innerHTML = products.map(product => `
      <div class="product-card" onclick="goToProduct(${product.id})">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="card-body">
          ${product.occasion ? `<span class="occasion-tag">${product.occasion}</span>` : ''}
          <h3>${product.name}</h3>
          <div class="price">$${product.price.toFixed(2)}</div>
          <button class="btn-secondary" onclick="event.stopPropagation(); addToCart(${product.id})">
            Add to Cart
          </button>
        </div>
      </div>
    `).join('');
  }

  // Global functions (also used in other pages)
  window.goToProduct = (id) => {
    window.location.href = `product.html?id=${id}`;
  };

  window.addToCart = (id) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      fetch('/data/products.json')
        .then(res => res.json())
        .then(products => {
          const product = products.find(p => p.id === id);
          cart.push({ ...product, quantity: 1 });
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartCount();
          alert(`${product.name} added to cart!`);
        });
    }
  };

  window.updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
  };

  // Run on every page that has cart count
  updateCartCount();
});