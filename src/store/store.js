export const products = [
  { id: 1, name: 'Santal 33', house: 'LE LABO', category: 'Woody', price: 235, size: '50 ml', image: 'photo-1594035910387-fea47794261f', note: 'Sandalwood · Cardamom · Leather', color: 'sand' },
  { id: 2, name: 'Baccarat Rouge 540', house: 'MAISON FRANCIS KURKDJIAN', category: 'Amber', price: 325, size: '70 ml', image: 'photo-1592945403244-b3fbafd7f539', note: 'Saffron · Amberwood · Jasmine', color: 'rose' },
  { id: 3, name: 'Another 13', house: 'LE LABO', category: 'Fresh', price: 235, size: '50 ml', image: 'photo-1595425970377-c9703cf48b6d', note: 'Pear · Musk · Ambrox', color: 'moss' },
  { id: 4, name: 'Bal d’Afrique', house: 'BYREDO', category: 'Floral', price: 290, size: '50 ml', image: 'photo-1615634260167-c8cdede054de', note: 'Bergamot · African marigold · Vetiver', color: 'citrus' },
]

export const categories = ['All scents', 'Woody', 'Amber', 'Fresh', 'Floral']

export function filterProducts(items, category, query = '') {
  const normalizedQuery = query.trim().toLowerCase()
  return items.filter((product) => {
    const matchesCategory = category === 'All scents' || product.category === category
    const searchableText = `${product.name} ${product.house} ${product.category} ${product.note}`.toLowerCase()
    return matchesCategory && searchableText.includes(normalizedQuery)
  })
}

export function addProductToCart(cart, product) {
  const existing = cart.find((item) => item.id === product.id)
  return existing
    ? cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
    : [...cart, { ...product, quantity: 1 }]
}

export function updateCartQuantity(cart, productId, change) {
  return cart
    .map((item) => item.id === productId ? { ...item, quantity: Math.max(0, item.quantity + change) } : item)
    .filter((item) => item.quantity > 0)
}

export function getCartSummary(cart) {
  return cart.reduce((summary, item) => ({
    count: summary.count + item.quantity,
    subtotal: summary.subtotal + item.price * item.quantity,
  }), { count: 0, subtotal: 0 })
}