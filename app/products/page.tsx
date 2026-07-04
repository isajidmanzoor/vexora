'use client'
import { useState } from 'react'
import { Search, ShoppingCart, Star, Heart, Filter } from 'lucide-react'

const products = [
  { id: 1, name: 'Smart LED Strip Lights', price: 29.99, original: 59.99, rating: 4.8, reviews: 1234, category: 'Home', badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id: 2, name: 'Wireless Earbuds Pro', price: 49.99, original: 99.99, rating: 4.9, reviews: 856, category: 'Electronics', badge: 'Hot', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80' },
  { id: 3, name: 'Yoga Mat Premium', price: 24.99, original: 49.99, rating: 4.7, reviews: 654, category: 'Gym', badge: 'Sale', image: 'https://images.unsplash.com/photo-1601925228604-57f844f7f9a2?w=400&q=80' },
  { id: 4, name: 'Skincare Kit Complete', price: 34.99, original: 69.99, rating: 4.6, reviews: 432, category: 'Beauty', badge: 'New', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80' },
  { id: 5, name: 'Kids Learning Tablet', price: 79.99, original: 149.99, rating: 4.8, reviews: 321, category: 'Kids', badge: 'Hot', image: 'https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?w=400&q=80' },
  { id: 6, name: 'Summer Dress Collection', price: 19.99, original: 39.99, rating: 4.5, reviews: 987, category: 'Fashion', badge: 'Sale', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80' },
  { id: 7, name: 'Smart Home Hub', price: 89.99, original: 179.99, rating: 4.9, reviews: 543, category: 'Electronics', badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80' },
  { id: 8, name: 'Resistance Bands Set', price: 14.99, original: 29.99, rating: 4.7, reviews: 765, category: 'Gym', badge: 'Sale', image: 'https://images.unsplash.com/photo-1598289431512-b97b0917afbe?w=400&q=80' },
  { id: 9, name: 'Perfume Collection', price: 44.99, original: 89.99, rating: 4.8, reviews: 234, category: 'Beauty', badge: 'New', image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=80' },
  { id: 10, name: 'Robot Toy Interactive', price: 39.99, original: 79.99, rating: 4.6, reviews: 456, category: 'Kids', badge: 'Hot', image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&q=80' },
  { id: 11, name: 'Minimalist Watch', price: 59.99, original: 119.99, rating: 4.8, reviews: 678, category: 'Fashion', badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80' },
  { id: 12, name: 'Air Purifier Mini', price: 69.99, original: 139.99, rating: 4.7, reviews: 345, category: 'Home', badge: 'New', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80' },
  { id: 13, name: 'Running Shoes Pro', price: 54.99, original: 109.99, rating: 4.8, reviews: 892, category: 'Fashion', badge: 'Hot', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  { id: 14, name: 'Coffee Maker Smart', price: 79.99, original: 159.99, rating: 4.7, reviews: 423, category: 'Home', badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80' },
  { id: 15, name: 'Bluetooth Speaker', price: 34.99, original: 69.99, rating: 4.6, reviews: 765, category: 'Electronics', badge: 'Sale', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80' },
  { id: 16, name: 'Dumbbells Set 20kg', price: 44.99, original: 89.99, rating: 4.9, reviews: 543, category: 'Gym', badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80' },
]

const categories = ['All', 'Home', 'Electronics', 'Gym', 'Beauty', 'Kids', 'Fashion']
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Best Rating', 'Most Reviews']

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('Featured')
  const [cart, setCart] = useState<number[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [added, setAdded] = useState<number | null>(null)
  const [showFilter, setShowFilter] = useState(false)
  const [maxPrice, setMaxPrice] = useState(200)

  let filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = activeCategory === 'All' || p.category === activeCategory
    const matchPrice = p.price <= maxPrice
    return matchSearch && matchCategory && matchPrice
  })

  if (sort === 'Price: Low to High') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'Price: High to Low') filtered = [...filtered].sort((a, b) => b.price - a.price)
  if (sort === 'Best Rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating)
  if (sort === 'Most Reviews') filtered = [...filtered].sort((a, b) => b.reviews - a.reviews)

  const addToCart = (id: number) => {
    setCart(prev => [...prev, id])
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
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <a href="/" className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent shrink-0">VEXORA</a>
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-xl">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-full pl-9 pr-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">✕</button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <a href="/cart" className="relative">
              <ShoppingCart size={22} className="text-gray-400 hover:text-white transition" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="py-6">
          <h1 className="text-3xl font-black mb-1">All <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Products</span></h1>
          <p className="text-gray-400 text-sm">{filtered.length} products found</p>
        </div>

        {/* Categories - Scrollable */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition font-medium ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:border-purple-500/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort + Filter Bar */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-400 hover:border-purple-500/50 transition"
          >
            <Filter size={14} /> Filter
          </button>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-400 focus:outline-none focus:border-purple-500"
          >
            {sortOptions.map(o => <option key={o} value={o} className="bg-gray-900">{o}</option>)}
          </select>
        </div>

        {/* Filter Panel */}
        {showFilter && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
            <h3 className="font-bold text-sm mb-3">Max Price: <span className="text-purple-400">${maxPrice}</span></h3>
            <input
              type="range"
              min="10"
              max="200"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$10</span><span>$200</span>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map(product => (
            <div key={product.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition group">
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                  {product.badge}
                </span>
                <button onClick={() => toggleWishlist(product.id)} className="absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center">
                  <Heart size={14} className={wishlist.includes(product.id) ? 'text-pink-500 fill-pink-500' : 'text-white'} />
                </button>
                <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {Math.round((1 - product.price / product.original) * 100)}% OFF
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="font-semibold text-sm mb-1 leading-tight line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={11} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-gray-400">{product.rating} ({product.reviews.toLocaleString()})</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-black text-purple-400 text-base">${product.price}</span>
                  <span className="text-xs text-gray-500 line-through">${product.original}</span>
                </div>
                <button
                  onClick={() => addToCart(product.id)}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition ${
                    added === product.id
                      ? 'bg-green-600 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {added === product.id ? '✓ Added to Cart!' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-gray-400 text-lg mb-2">No products found</p>
            <button onClick={() => { setSearch(''); setActiveCategory('All'); setMaxPrice(200) }} className="text-purple-400 text-sm hover:underline">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
