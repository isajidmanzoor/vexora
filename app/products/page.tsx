'use client'
import { useState } from 'react'
import { Search, Filter, ShoppingCart, Star, Heart } from 'lucide-react'

const products = [
  { id: 1, name: 'Smart LED Strip Lights', price: 29.99, original: 59.99, rating: 4.8, reviews: 1234, category: 'Home', emoji: '💡', badge: 'Best Seller' },
  { id: 2, name: 'Wireless Earbuds Pro', price: 49.99, original: 99.99, rating: 4.9, reviews: 856, category: 'Electronics', emoji: '🎧', badge: 'Hot' },
  { id: 3, name: 'Yoga Mat Premium', price: 24.99, original: 49.99, rating: 4.7, reviews: 654, category: 'Gym', emoji: '🧘', badge: 'Sale' },
  { id: 4, name: 'Skincare Kit Complete', price: 34.99, original: 69.99, rating: 4.6, reviews: 432, category: 'Beauty', emoji: '✨', badge: 'New' },
  { id: 5, name: 'Kids Learning Tablet', price: 79.99, original: 149.99, rating: 4.8, reviews: 321, category: 'Kids', emoji: '📱', badge: 'Hot' },
  { id: 6, name: 'Summer Dress Collection', price: 19.99, original: 39.99, rating: 4.5, reviews: 987, category: 'Fashion', emoji: '👗', badge: 'Sale' },
  { id: 7, name: 'Smart Home Hub', price: 89.99, original: 179.99, rating: 4.9, reviews: 543, category: 'Electronics', emoji: '🏠', badge: 'Best Seller' },
  { id: 8, name: 'Resistance Bands Set', price: 14.99, original: 29.99, rating: 4.7, reviews: 765, category: 'Gym', emoji: '💪', badge: 'Sale' },
  { id: 9, name: 'Perfume Collection', price: 44.99, original: 89.99, rating: 4.8, reviews: 234, category: 'Beauty', emoji: '🌸', badge: 'New' },
  { id: 10, name: 'Robot Toy Interactive', price: 39.99, original: 79.99, rating: 4.6, reviews: 456, category: 'Kids', emoji: '🤖', badge: 'Hot' },
  { id: 11, name: 'Minimalist Watch', price: 59.99, original: 119.99, rating: 4.8, reviews: 678, category: 'Fashion', emoji: '⌚', badge: 'Best Seller' },
  { id: 12, name: 'Air Purifier Mini', price: 69.99, original: 139.99, rating: 4.7, reviews: 345, category: 'Home', emoji: '🌬️', badge: 'New' },
]

const categories = ['All', 'Home', 'Electronics', 'Gym', 'Beauty', 'Kids', 'Fashion']

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [cart, setCart] = useState<number[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [added, setAdded] = useState<number | null>(null)

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = activeCategory === 'All' || p.category === activeCategory
    return matchSearch && matchCategory
  })

  const addToCart = (id: number) => {
    setCart([...cart, id])
    setAdded(id)
    setTimeout(() => setAdded(null), 1500)
  }

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">VEXORA</a>
          <div className="flex items-center gap-4">
            <a href="/cpa" className="text-gray-400 hover:text-white text-sm transition">Earn</a>
            <button className="relative">
              <ShoppingCart size={24} className="text-gray-400 hover:text-white transition" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black mb-2">All <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Products</span></h1>
          <p className="text-gray-400">10,000+ products at best prices</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:border-purple-500/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(product => (
            <div key={product.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition group">
              {/* Image */}
              <div className="relative bg-gradient-to-br from-purple-900/20 to-pink-900/20 h-40 flex items-center justify-center">
                <span className="text-6xl">{product.emoji}</span>
                <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {product.badge}
                </span>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2 right-2"
                >
                  <Heart
                    size={18}
                    className={wishlist.includes(product.id) ? 'text-pink-500 fill-pink-500' : 'text-gray-400'}
                  />
                </button>
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="font-semibold text-sm mb-1 leading-tight">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-gray-400">{product.rating} ({product.reviews})</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-black text-purple-400">${product.price}</span>
                  <span className="text-xs text-gray-500 line-through">${product.original}</span>
                  <span className="text-xs text-green-400">
                    {Math.round((1 - product.price / product.original) * 100)}% off
                  </span>
                </div>
                <button
                  onClick={() => addToCart(product.id)}
                  className={`w-full py-2 rounded-xl text-sm font-bold transition ${
                    added === product.id
                      ? 'bg-green-600 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {added === product.id ? '✓ Added!' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">🔍</p>
            <p>No products found for "{search}"</p>
          </div>
        )}
      </div>
    </div>
  )
}
