// CRUD for flower packages
// admin/js/products.js
// Only runs on products.html
const products = JSON.parse(localStorage.getItem('valspack_products')) || [];

function loadProducts() {
  const container = document.getElementById('productsContainer');
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = `<div class="no-products">
      No products yet. Click "Add New Product" to start selling your beautiful bouquets
    </div>`;
    return;
  }

  container.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.image || 'https://via.placeholder.com/300x240/ff3385/white?text=No+Image'}" class="product-img" alt="${p.name}">
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-price">₦${Number(p.price).toLocaleString()}</div>
        <div class="product-stock ${p.stock <= 3 ? 'stock-low' : ''} ${p.stock == 0 ? 'out-of-stock' : ''}">
          Stock: <strong>${p.stock == 0 ? 'Out of Stock' : p.stock + ' left'}</strong>
        </div>
        <div class="product-actions">
          <div class="btn btn-edit" onclick="editProduct(${p.id})">Edit</div>
          <div class="btn btn-delete" onclick="deleteProduct(${p.id})">Delete</div>
        </div>
      </div>
    </div>
  `).join('');
}

window.deleteProduct = function(id) {
  if (confirm('Delete this bouquet forever?')) {
    const updated = products.filter(p => p.id !== id);
    localStorage.setItem('valspack_products', JSON.stringify(updated));
    location.reload();
  }
};

window.editProduct = function(id) {
  window.location.href = `add-product.html?id=${id}`;
};

document.addEventListener('DOMContentLoaded', loadProducts);