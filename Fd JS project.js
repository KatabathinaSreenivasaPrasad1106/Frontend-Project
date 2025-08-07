const productCards = document.querySelectorAll('.product-card');
const bundleList = document.getElementById('bundle-list');
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');
const discountAmount = document.getElementById('discount-amount');
const subtotalText = document.getElementById('subtotal');
const addToCartBtn = document.getElementById('add-to-cart');

let selectedProducts = [];

productCards.forEach(card => {
  const btn = card.querySelector('.add-btn');
  
  btn.addEventListener('click', () => {
    const id = card.dataset.id;
    const title = card.dataset.title;
    const price = parseFloat(card.dataset.price);
    const image = card.dataset.image;

    const existingIndex = selectedProducts.findIndex(p => p.id === id);

    if (existingIndex !== -1) {
      // Remove product
      selectedProducts.splice(existingIndex, 1);
      btn.textContent = 'Add to Bundle';
      btn.classList.remove('added');
    } else {
      // Add product
      selectedProducts.push({ id, title, price, image });
      btn.textContent = 'Added ✓';
      btn.classList.add('added');
    }

    updateSidebar();
  });
});

function updateSidebar() {
  // Update Progress Bar
  const count = selectedProducts.length;
  progressText.textContent = `${count} / 3 Selected`;
  progressFill.style.width = `${Math.min(count, 3) / 3 * 100}%`;

  // Update Bundle List
  bundleList.innerHTML = '';
  let total = 0;

  selectedProducts.forEach(product => {
    total += product.price;
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <span>${product.title} – $${product.price.toFixed(2)}</span>
    `;
    bundleList.appendChild(li);
  });

  // Calculate Discount
  let discount = 0;
  if (count >= 3) {
    discount = total * 0.3;
    discountAmount.textContent = `- $${discount.toFixed(2)} (30%)`;
    addToCartBtn.disabled = false;
    addToCartBtn.classList.add('active');
    addToCartBtn.style.cursor = 'pointer';
  } else {
    discountAmount.textContent = '—';
    addToCartBtn.disabled = true;
    addToCartBtn.classList.remove('active');
    addToCartBtn.style.cursor = 'not-allowed';
  }

  // Update Subtotal
  const subtotal = total - discount;
  subtotalText.textContent = `$${subtotal.toFixed(2)}`;
}

// Log final bundle
addToCartBtn.addEventListener('click', () => {
  if (!addToCartBtn.disabled) {
    console.log('Final Bundle:', selectedProducts);
    alert('Bundle Added! Check the console for details.');
  }
});
selectedProducts.forEach(product => {
  total += product.price;
  const li = document.createElement('li');
  li.innerHTML = `
    <img src="${photo-1}" alt="${product.title}">
    <span>${product.title} – $${product.price.toFixed(2)}</span>
  `;
  bundleList.appendChild(li);
});

selectedProducts.forEach(product => {
  total += product.price;
  const li = document.createElement('li');
  li.classList.add("bundle-item");
  li.innerHTML = `
    <div class="item-thumb">
      <img src="${product.image}" alt="${product.title}" />
    </div>
    <div class="item-info">
      <p class="item-title">${product.title}</p>
      <p class="item-price">$${product.price.toFixed(2)}</p>
    </div>
  `;
  bundleList.appendChild(li);
});
button.innerHTML = `<img src="assets/icons/checkmark.png" class="icon" /> Added ✓`;
    li.classList.add("bundle-item");
    const li = document.createElement("li");
li.innerHTML = `
  <img src="${product.image}" alt="${product.title}">
  <span>${product.title} – $${product.price.toFixed(2)}</span>
  <button class="remove-btn" data-id="${product.id}">
    <img src="assets/icons/remove.png" alt="Remove" class="icon" />
  </button>
`;
li.querySelector('.remove-btn').addEventListener('click', (e) => {
  const id = parseInt(e.currentTarget.dataset.id);
  selectedProducts = selectedProducts.filter(p => p.id !== id);
  updateSidebar();
  resetProductButton(id);
});
function resetProductButton(id) {
  const card = document.querySelector(`.product-card[data-id='${id}']`);
  const btn = card.querySelector(".add-btn");
  btn.textContent = "Add to Bundle";
  btn.classList.remove("added");
}


