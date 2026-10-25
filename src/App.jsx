import { useMemo, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, Check, Heart, Menu, Minus, Plus, Search, ShoppingBag, X } from 'lucide-react'
import './App.css'

const products = [
  { id: 1, name: 'Santal 33', house: 'LE LABO', category: 'Woody', price: 235, size: '50 ml', image: 'photo-1594035910387-fea47794261f', note: 'Sandalwood · Cardamom · Leather', color: 'sand' },
  { id: 2, name: 'Baccarat Rouge 540', house: 'MAISON FRANCIS KURKDJIAN', category: 'Amber', price: 325, size: '70 ml', image: 'photo-1592945403244-b3fbafd7f539', note: 'Saffron · Amberwood · Jasmine', color: 'rose' },
  { id: 3, name: 'Another 13', house: 'LE LABO', category: 'Fresh', price: 235, size: '50 ml', image: 'photo-1595425970377-c9703cf48b6d', note: 'Pear · Musk · Ambrox', color: 'moss' },
  { id: 4, name: 'Bal d’Afrique', house: 'BYREDO', category: 'Floral', price: 290, size: '50 ml', image: 'photo-1615634260167-c8cdede054de', note: 'Bergamot · African marigold · Vetiver', color: 'citrus' },
]

const categories = ['All scents', 'Woody', 'Amber', 'Fresh', 'Floral']

function App() {
  const [activeCategory, setActiveCategory] = useState('All scents')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [saved, setSaved] = useState([])
  const [notice, setNotice] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const visibleProducts = useMemo(
    () => products.filter((product) => {
      const matchesCategory = activeCategory === 'All scents' || product.category === activeCategory
      const searchableText = `${product.name} ${product.house} ${product.category} ${product.note}`.toLowerCase()
      return matchesCategory && searchableText.includes(searchTerm.trim().toLowerCase())
    }),
    [activeCategory, searchTerm],
  )
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      return existing
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }]
    })
    setNotice(`${product.name} added to your bag`)
    window.setTimeout(() => setNotice(''), 2400)
  }

  function changeQuantity(id, amount) {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0))
  }

  return (
    <div className="storefront">
      <div className="announcement">COMPLIMENTARY SHIPPING ON ORDERS OVER $150 <span>·</span> DISCOVER YOUR NEXT SIGNATURE</div>
      <header className="site-header">
        <button className="icon-button mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#collection">SHOP ALL</a><a href="#collection">DISCOVER</a><a href="#story">OUR STORY</a>
        </nav>
        <a className="wordmark" href="#top" aria-label="Sillage home">SILLAGE<span>SCENT, REMEMBERED.</span></a>
        <div className="header-actions">
          <button className="icon-button search-button" aria-label={searchOpen ? 'Close search' : 'Search'} onClick={() => setSearchOpen((open) => !open)}>{searchOpen ? <X size={19} /> : <Search size={19} />}</button>
          <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Open bag, ${cartCount} items`}><span>BAG</span><span className="bag-count">{cartCount}</span></button>
        </div>
      </header>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#collection" onClick={() => setMenuOpen(false)}>SHOP ALL</a><a href="#collection" onClick={() => setMenuOpen(false)}>DISCOVER</a><a href="#story" onClick={() => setMenuOpen(false)}>OUR STORY</a></nav>}
      {searchOpen && <form className="search-panel" role="search" onSubmit={(event) => { event.preventDefault(); document.querySelector('#collection')?.scrollIntoView({ behavior: 'smooth' }) }}><Search size={17} /><input autoFocus aria-label="Search fragrances" placeholder="Search by fragrance, house, or note" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /><button type="button" aria-label="Clear search" onClick={() => setSearchTerm('')}><X size={16} /></button></form>}

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> THE ART OF FINDING YOUR SCENT</p>
            <h1 id="hero-title">A little<br /><em>closer</em> to<br />yourself.</h1>
            <p className="hero-description">Considered fragrances for the moments that stay with you.</p>
            <a className="primary-link" href="#collection">EXPLORE THE COLLECTION <ArrowRight size={15} /></a>
            <span className="hero-index">01 — 04</span>
          </div>
          <div className="hero-image" role="img" aria-label="A sculptural fragrance bottle in warm afternoon light">
            <div className="image-caption"><span>THE SILLAGE EDIT</span><span>NO. 04 / AUTUMN</span></div>
            <div className="hero-stamp">SCENT<br />IS A<br /><i>memory</i></div>
          </div>
          <div className="hero-side-note">PERSONALITY, IN A BOTTLE <span>↘</span></div>
        </section>

        <section className="intro-strip" id="story">
          <span>CURATED, NEVER CROWDED</span><p>Independent fragrance houses.<br />Unforgettable compositions.</p><a href="#collection" aria-label="Discover our collection"><ArrowDown size={18} /></a>
        </section>

        <section className="collection" id="collection">
          <div className="section-heading">
            <div><p className="eyebrow">THE EDIT / 2026</p><h2>Find your <em>notes.</em></h2></div>
            <a className="text-link" href="#collection">VIEW ALL FRAGRANCES <ArrowRight size={14} /></a>
          </div>
          <div className="filter-row" role="tablist" aria-label="Filter fragrances">
            {categories.map((category) => <button key={category} role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? 'filter active' : 'filter'} onClick={() => setActiveCategory(category)}>{category}</button>)}
            <span className="product-count">0{visibleProducts.length} FRAGRANCES</span>
          </div>
          <div className="product-grid">
            {visibleProducts.map((product, index) => (
              <article className="product-card" key={product.id} style={{ '--card-index': index }}>
                <div className={`product-image ${product.color}`}>
                  <img src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=900&q=85`} alt={`${product.name} fragrance bottle`} loading="lazy" />
                  <span className="product-tag">{product.category.toUpperCase()}</span>
                  <button className={`save-button ${saved.includes(product.id) ? 'saved' : ''}`} aria-label={saved.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'} onClick={() => setSaved((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])}><Heart size={17} fill={saved.includes(product.id) ? 'currentColor' : 'none'} /></button>
                  <button className="quick-add" onClick={() => addToCart(product)}>ADD TO BAG <Plus size={14} /></button>
                </div>
                <div className="product-meta"><div><span className="product-house">{product.house}</span><h3>{product.name}</h3></div><span className="price">${product.price}</span></div>
                <div className="product-submeta"><span>{product.note}</span><span>{product.size}</span></div>
              </article>
            ))}
          </div>
          {visibleProducts.length === 0 && <p className="no-results">No fragrances match that search. Try another scent, house, or note.</p>}
        </section>

        <section className="quote-band"><span className="quote-mark">“</span><blockquote>A fragrance is the punctuation<br />mark at the end of a feeling.</blockquote><span className="quote-credit">NOTES FROM THE SILLAGE JOURNAL</span></section>
      </main>

      <footer className="site-footer"><a className="footer-wordmark" href="#top">SILLAGE</a><span>GOOD SCENT. GOOD SENSE.</span><span>© SILLAGE 2026</span><a href="#top">BACK TO TOP ↑</a></footer>

      {notice && <div className="toast" role="status"><Check size={16} /> {notice}</div>}
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
        <aside className="cart-drawer" aria-label="Shopping bag" onClick={(event) => event.stopPropagation()}>
          <div className="drawer-header"><div><p className="eyebrow">YOUR SELECTION</p><h2>The bag <span>({cartCount})</span></h2></div><button className="icon-button" aria-label="Close bag" onClick={() => setCartOpen(false)}><X size={20} /></button></div>
          {cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={28} /><p>Your next favorite is waiting.</p><button className="primary-link" onClick={() => setCartOpen(false)}>EXPLORE FRAGRANCES <ArrowRight size={15} /></button></div> : <>
            <div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=240&q=80`} alt="" /><div className="cart-item-info"><span className="product-house">{item.house}</span><h3>{item.name}</h3><span>{item.size}</span><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => changeQuantity(item.id, -1)}><Minus size={13} /></button><span>{item.quantity}</span><button aria-label="Increase quantity" onClick={() => changeQuantity(item.id, 1)}><Plus size={13} /></button></div></div><span className="cart-item-price">${item.price * item.quantity}</span></div>)}</div>
            <div className="cart-summary"><p><span>SUBTOTAL</span><strong>${subtotal}</strong></p><p className="shipping-note">Shipping calculated at checkout.</p><button className="checkout-button" onClick={() => setNotice('Checkout is coming soon')}>CONTINUE TO CHECKOUT <ArrowRight size={16} /></button><button className="continue-shopping" onClick={() => setCartOpen(false)}><ArrowLeft size={14} /> CONTINUE SHOPPING</button></div>
          </>}
        </aside>
      </div>}
    </div>
  )
}

export default App
