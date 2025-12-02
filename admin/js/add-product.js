// admin/js/add-product.js — FINAL FIXED VERSION
document.addEventListener('DOMContentLoaded', () => {
  let products = JSON.parse(localStorage.getItem('valspack_products') || '[]');
  const urlParams = new URLSearchParams(window.location.search);
  const editId = urlParams.get('id');
  let currentProduct = editId ? products.find(p => p.id == editId) : null;

  const preview = document.getElementById('preview');
  const imageInput = document.getElementById('imageInput');
  const uploadArea = document.getElementById('imageUpload');

  let currentImageBase64 = currentProduct?.image || ''; // Keep old image if editing

  // === LOAD PRODUCT IF EDITING ===
  if (currentProduct) {
    document.querySelector('.page-title h1').textContent = "Edit Product";
    document.getElementById('productName').value = currentProduct.name;
    document.getElementById('price').value = currentProduct.price;
    document.getElementById('stock').value = currentProduct.stock;
    document.getElementById('category').value = currentProduct.category || "";
    document.getElementById('description').value = currentProduct.description || "";

    if (currentProduct.image) {
      preview.src = currentProduct.image;
      preview.style.display = 'block';
      currentImageBase64 = currentProduct.image;
    }
  }

  // === IMAGE PREVIEW & CAPTURE ===
  const readImage = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      preview.style.display = 'block';
      currentImageBase64 = e.target.result; // This is what gets saved
    };
    reader.readAsDataURL(file);
  };

  // Click to upload
  uploadArea.addEventListener('click', () => imageInput.click());

  // File selected
  imageInput.addEventListener('change', () => {
    if (imageInput.files[0]) readImage(imageInput.files[0]);
  });

  // Drag & Drop
  ['dragover', 'dragenter'].forEach(evt => {
    uploadArea.addEventListener(evt, e => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(evt => {
    uploadArea.addEventListener(evt, e => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
    });
  });

  uploadArea.addEventListener('drop', e => {
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      readImage(file);
    }
  });

  // === SAVE PRODUCT ===
  document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('productName').value.trim();
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;

    if (!name || !price || !category || !currentImageBase64) {
      alert('Please fill all fields and upload an image!');
      return;
    }

    const productData = {
      id: currentProduct ? currentProduct.id : Date.now(),
      name: name,
      price: parseFloat(price),
      stock: parseInt(stock) || 0,
      category: category,
      description: document.getElementById('description').value.trim(),
      image: currentImageBase64, // Always valid image
      dateAdded: currentProduct ? currentProduct.dateAdded : new Date().toISOString().split('T')[0]
    };

    if (currentProduct) {
      products = products.map(p => p.id === currentProduct.id ? productData : p);
    } else {
      products.push(productData);
    }

    localStorage.setItem('valspack_products', JSON.stringify(products));
    alert(currentProduct ? 'Product updated successfully!' : 'New flower added! Redirecting...');

    // GO TO PRODUCTS PAGE — IT WILL NOW SHOW YOUR NEW FLOWER
    window.location.href = 'products.html';
  });
});