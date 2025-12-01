window.CATALOG = {
  products: [
    {
      id: 'slip-dress',
      name: 'Silk Slip Dress',
      price: 24800,
      currency: 'USD',
      images: [
        'https://picsum.photos/seed/slip-dress/1200/800',
        'https://picsum.photos/seed/slip-dress-alt/1200/800'
      ],
      variants: { type: 'color', options: ['Champagne','Sand','Charcoal'], default: 'Champagne' },
      sizes: null,
      description: 'Bias-cut silk slip dress with airy movement and delicate straps.'
    },
    {
      id: 'mini-bag',
      name: 'Mini Leather Bag',
      price: 19800,
      currency: 'USD',
      images: [
        'https://picsum.photos/seed/mini-bag/1200/800'
      ],
      variants: { type: 'color', options: ['Black','Soft Gold'], default: 'Black' },
      sizes: null,
      description: 'Structured mini bag crafted in smooth leather with signature hardware.'
    },
    {
      id: 'gold-cuff',
      name: 'Gold Cuff',
      price: 12800,
      currency: 'USD',
      images: [
        'https://picsum.photos/seed/gold-cuff/1200/800'
      ],
      variants: { type: 'finish', options: ['Soft Gold','Antique Gold'], default: 'Soft Gold' },
      sizes: null,
      description: 'Sculptural cuff with soft gold finish, a timeless everyday accent.'
    },
    {
      id: 'charcoal-blazer',
      name: 'Charcoal Blazer',
      price: 29800,
      currency: 'USD',
      images: [
        'https://picsum.photos/seed/charcoal-blazer/1200/800'
      ],
      variants: { type: 'size', options: ['XS','S','M','L'], default: 'XS' },
      sizes: ['XS','S','M','L'],
      description: 'Tailored blazer in charcoal with refined lapels and soft shoulder line.'
    }
  ]
};

