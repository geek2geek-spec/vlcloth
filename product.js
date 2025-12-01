document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const product = (window.CATALOG?.products || []).find(p=>p.id===id);
  const mount = document.getElementById('detail');
  if (!product || !mount) return;

  const price = `$${(product.price/100).toFixed(0)}`;
  const img = product.images[0];
  const variantLabel = product.variants.type === 'size' ? 'Size' : (product.variants.type === 'finish' ? 'Finish' : 'Color');

  mount.innerHTML = `
    <div class="detail-images">
      <img src="${img}" alt="${product.name}" data-ph="assets/hero.svg" />
    </div>
    <div class="detail-info">
      <h1 class="detail-title">${product.name}</h1>
      <div class="detail-price">${price}</div>
      <p class="detail-desc">${product.description}</p>
      <div class="detail-controls">
        <div class="variants" role="group" aria-label="Choose ${variantLabel}">
          ${product.variants.options.map((opt,idx)=>{
            if (product.variants.type==='size'){
              return `<button class="swatch-pill ${idx===0?'selected':''}" data-variant="${opt}">${opt}</button>`
            } else {
              const dot = opt.toLowerCase().includes('gold')? '#c9a34a' : opt.toLowerCase().includes('black')? '#1f1f1f' : opt.toLowerCase().includes('champagne')? '#f3e8d2' : opt.toLowerCase().includes('sand')? '#d9d2c0' : '#2a2a2a';
              return `<button class="swatch-dot ${idx===0?'selected':''}" style="--dot:${dot}" data-variant="${opt}" aria-label="${opt}"></button>`
            }
          }).join('')}
        </div>
        <div class="chosen">${variantLabel}: ${product.variants.default}</div>
        <div class="detail-actions">
          <button class="btn btn-primary" id="add">Add to Cart</button>
          <a class="btn btn-ghost" href="cart.html">Go to Cart</a>
        </div>
      </div>
    </div>
  `;

  const chosen = mount.querySelector('.chosen');
  const variantButtons = mount.querySelectorAll('.variants button');
  variantButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      variantButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const variant = btn.dataset.variant;
      const label = chosen.textContent.split(':')[0];
      chosen.textContent = `${label}: ${variant}`;
    });
  });

  const addBtn = document.getElementById('add');
  addBtn.addEventListener('click', () => {
    const selected = mount.querySelector('.variants .selected');
    const variant = selected ? selected.dataset.variant : product.variants.default;
    addToCart({ id: product.id, variant, size: variant, qty: 1 });
  });
});

