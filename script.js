document.addEventListener('DOMContentLoaded', () => {
  const productCards = document.querySelectorAll('[data-product]');

  productCards.forEach(card => {
    const chosen = card.querySelector('.chosen');
    const variantButtons = card.querySelectorAll('.variants button');
    variantButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        variantButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        const variant = btn.dataset.variant;
        const label = chosen.textContent.split(':')[0];
        chosen.textContent = `${label}: ${variant}`;
      });
    });
  });

  const newsletter = document.querySelector('.newsletter');
  if (newsletter) {
    newsletter.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletter.querySelector('input[type="email"]');
      if (!input.value) return;
      alert('Thank you for subscribing to Bentley Rae Boutique.');
      input.value = '';
    });
  }

  const cart = getCart();
  updateCartBadge(cart);

  productCards.forEach(card => {
    const addBtn = card.querySelector('.btn-add');
    if (!addBtn) return;
    addBtn.addEventListener('click', () => {
      const id = card.dataset.id;
      const chosen = card.querySelector('.chosen')?.textContent || '';
      let variant = null;
      const selectedVar = card.querySelector('.variants .selected');
      if (selectedVar) variant = selectedVar.dataset.variant;
      const item = { id, variant, size: variant, qty: 1 };
      addToCart(item);
    });
  });
  const imgs = document.querySelectorAll('img');
  imgs.forEach(img => {
    img.addEventListener('error', () => {
      const ph = img.getAttribute('data-ph');
      if (ph) img.src = ph;
      else img.src = 'https://placehold.co/1200x800?text=Image&bg=F8F5EF&color=2A2A2A';
    });
  });
});

function getCart(){
  try { return JSON.parse(localStorage.getItem('brb_cart')||'[]') } catch(e){ return [] }
}
function setCart(cart){
  localStorage.setItem('brb_cart', JSON.stringify(cart));
}
function updateCartBadge(cart){
  const count = cart.reduce((sum,i)=>sum+i.qty,0);
  const badge = document.querySelector('.cart-count');
  if (badge) badge.textContent = String(count);
}
function addToCart(item){
  const cart = getCart();
  const key = (i)=> i.id+':' + (i.variant||'');
  const idx = cart.findIndex(i=> key(i)===key(item));
  if (idx>-1){ cart[idx].qty += item.qty; } else { cart.push(item); }
  setCart(cart);
  updateCartBadge(cart);
  alert('Added to cart');
}

