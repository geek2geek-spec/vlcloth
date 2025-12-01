document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  const checkout = document.getElementById('checkout');
  if (checkout){
    checkout.addEventListener('click', () => {
      alert('Checkout is not implemented yet. This is a demo cart.');
    });
  }
});

function renderCart(){
  const itemsEl = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  const cart = getCart();
  const catalog = window.CATALOG?.products || [];
  itemsEl.innerHTML = '';

  let subtotal = 0;

  cart.forEach((item, idx) => {
    const product = catalog.find(p=>p.id===item.id);
    if (!product) return;
    const price = product.price;
    subtotal += price * item.qty;
    const node = document.createElement('div');
    node.className = 'cart-item';
    node.innerHTML = `
      <img src="${product.images[0]}" alt="${product.name}">
      <div class="meta">
        <div style="font-family:'Cormorant Garamond', serif;font-weight:600;color:var(--ink)">${product.name}</div>
        <div style="color:#666;font-size:13px">${item.variant? item.variant : ''}</div>
        <div style="margin-top:8px;display:flex;align-items:center;gap:10px">
          <div class="qty">
            <button data-action="dec" data-index="${idx}">–</button>
            <span class="count">${item.qty}</span>
            <button data-action="inc" data-index="${idx}">+</button>
          </div>
          <button class="btn btn-ghost" data-action="remove" data-index="${idx}">Remove</button>
        </div>
      </div>
      <div style="align-self:flex-start;color:#3b3b3b">$${(price/100).toFixed(0)}</div>
    `;
    itemsEl.appendChild(node);
    const imgEl = node.querySelector('img');
    if (imgEl){
      imgEl.addEventListener('error', () => {
        imgEl.src = `https://placehold.co/96x96?text=${encodeURIComponent(product.name)}&bg=EDE6DA&color=2A2A2A`;
      });
    }
  });

  const fmt = (cents)=> `$${(cents/100).toFixed(0)}`;
  subtotalEl.textContent = fmt(subtotal);
  totalEl.textContent = fmt(subtotal);

  itemsEl.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const idx = Number(t.getAttribute('data-index'));
    const action = t.getAttribute('data-action');
    if (Number.isNaN(idx) || !action) return;
    const cart = getCart();
    if (action==='inc') cart[idx].qty += 1;
    if (action==='dec') cart[idx].qty = Math.max(1, cart[idx].qty-1);
    if (action==='remove') cart.splice(idx,1);
    setCart(cart);
    updateCartBadge(cart);
    renderCart();
  });
}

