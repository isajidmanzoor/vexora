'use client'
import { useState, useEffect } from 'react'
import { Search, ShoppingCart, Star, Heart, Filter, Loader, RefreshCw } from 'lucide-react'

const categories = [
  { name: 'All', id: '' },
  { name: 'Home', id: '200003655' },
  { name: 'Electronics', id: '200000606' },
  { name: 'Fashion', id: '200000343' },
  { name: 'Gym', id: '200000507' },
  { name: 'Beauty', id: '200000070' },
  { name: 'Kids', id: '200000157' },
]

const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Best Rating']

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState({ name: 'All', id: '' })
  const [sort, setSort] = useState('Featured')
  const [cart, setCart] = useState<string[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [added, setAdded] = useState<string | null>(null)
  const [showFilter, setShowFilter] = useState(false)
  const [maxPrice, setMaxPrice] = useState(200)
  const [syncing, setSyncing] = useState(false)
  const [syncMsg, setSyncMsg] = useState<string | null>(null)

  const fetchProducts = async (keywords = 'trending', categoryId = '') => {
    setLoading(true)
    try {
      const res = await fetch(`/api/products?keywords=${keywords}&category=${categoryId}`)
      const data = await res.json()
      if (data.products && data.products.length > 0) {
        setProducts(data.products)
      } else {
        setProducts(fallbackProducts)
      }
    } catch {
      setProducts(fallbackProducts)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const syncNow = async () => {
    setSyncing(true)
    setSyncMsg(null)
    await fetchProducts(activeCategory.name === 'All' ? 'trending' : activeCategory.name, activeCategory.id)
    setSyncing(false)
    setSyncMsg('Synced!')
    setTimeout(() => setSyncMsg(null), 2000)
  }

  const handleCategory = (cat: { name: string, id: string }) => {
    setActiveCategory(cat)
    fetchProducts(cat.name === 'All' ? 'trending' : cat.name, cat.id)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) fetchProducts(search)
  }

  let filtered = products.filter(p => {
    const price = parseFloat(p.target_sale_price || p.sale_price || '0')
    return price <= maxPrice || maxPrice === 200
  })

  if (sort === 'Price: Low to High') filtered = [...filtered].sort((a, b) => parseFloat(a.target_sale_price || '0') - parseFloat(b.target_sale_price || '0'))
  if (sort === 'Price: High to Low') filtered = [...filtered].sort((a, b) => parseFloat(b.target_sale_price || '0') - parseFloat(a.target_sale_price || '0'))

  const addToCart = (id: string) => {
    setCart(prev => [...prev, id])
    setAdded(id)
    setTimeout(() => setAdded(null), 1500)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <a href="/" className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent shrink-0">VEXORA</a>
          <form onSubmit={handleSearch} className="relative flex-1 max-w-xl">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-full pl-9 pr-16 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
              Search
            </button>
          </form>
          <a href="/cart" className="relative">
            <ShoppingCart size={22} className="text-gray-400 hover:text-white transition" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </a>
        </div>
      </nav>

      <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
        <div className="py-6">
          <h1 className="text-3xl font-black mb-1">All <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Products</span></h1>
          <p className="text-gray-400 text-sm">{filtered.length} products found</p>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => handleCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition font-medium ${
                activeCategory.name === cat.name
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:border-purple-500/50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort + Filter */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-400 hover:border-purple-500/50 transition"
            >
              <Filter size={14} /> Filter
            </button>
            <button
              onClick={syncNow}
              disabled={syncing}
              className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-400 hover:border-purple-500/50 transition disabled:opacity-50"
            >
              <RefreshCw size={14} className={syncing ? 'animate-spin' : ''} />
              {syncMsg || (syncing ? 'Syncing...' : 'Sync')}
            </button>
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-400 focus:outline-none"
          >
            {sortOptions.map(o => <option key={o} value={o} className="bg-gray-900">{o}</option>)}
          </select>
        </div>

        {showFilter && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
            <h3 className="font-bold text-sm mb-3">Max Price: <span className="text-purple-400">${maxPrice}</span></h3>
            <input type="range" min="10" max="200" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full accent-purple-500" />
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader size={40} className="text-purple-400 animate-spin" />
            <span className="ml-3 text-gray-400">Loading products...</span>
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filtered.map((product, i) => {
              const id = product.product_id || String(i)
              const name = product.product_title || product.name
              const price = product.target_sale_price || product.sale_price || '0'
              const original = product.original_price || price
              const image = product.product_main_image_url || product.image
              const url = product.promotion_link || '#'
              const discount = product.discount || Math.round((1 - parseFloat(price)/parseFloat(original)) * 100)

              return (
                <div key={id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition group">
                  <div className="relative h-44 overflow-hidden bg-gray-900">
                    <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    {discount > 0 && (
                      <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        {discount}% OFF
                      </div>
                    )}
                    <button onClick={() => setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])} className="absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center">
                      <Heart size={14} className={wishlist.includes(id) ? 'text-pink-500 fill-pink-500' : 'text-white'} />
                    </button>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-xs mb-2 leading-tight line-clamp-2">{name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-black text-purple-400">${price}</span>
                      {original !== price && <span className="text-xs text-gray-500 line-through">${original}</span>}
                    </div>
                    <a href={url} target="_blank" rel="noopener noreferrer"
                      onClick={() => addToCart(id)}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition block text-center ${
                        added === id ? 'bg-green-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
                      }`}
                    >
                      {added === id ? '✓ Added!' : 'Buy Now'}
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

const fallbackProducts = [
  { product_id: '1', product_title: 'Smart LED Strip Lights', target_sale_price: '29.99', original_price: '59.99', product_main_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', discount: 50, promotion_link: '#' },
  { product_id: '2', product_title: 'Wireless Earbuds Pro', target_sale_price: '49.99', original_price: '99.99', product_main_image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80', discount: 50, promotion_link: '#' },
  { product_id: '3', product_title: 'Yoga Mat Premium', target_sale_price: '24.99', original_price: '49.99', product_main_image_url: 'https://images.unsplash.com/photo-1601925228604-57f844f7f9a2?w=400&q=80', discount: 50, promotion_link: '#' },
  { product_id: '4', product_title: 'Skincare Kit Complete', target_sale_price: '34.99', original_price: '69.99', product_main_image_url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80', discount: 50, promotion_link: '#' },
  { product_id: '5', product_title: 'Smart Home Hub', target_sale_price: '89.99', original_price: '179.99', product_main_image_url: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80', discount: 50, promotion_link: '#' },
  { product_id: '6', product_title: 'Running Shoes Pro', target_sale_price: '54.99', original_price: '109.99', product_main_image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', discount: 50, promotion_link: '#' },
  { product_id: '7', product_title: 'Coffee Maker Smart', target_sale_price: '79.99', original_price: '159.99', product_main_image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80', discount: 50, promotion_link: '#' },
  { product_id: '8', product_title: 'Bluetooth Speaker', target_sale_price: '34.99', original_price: '69.99', product_main_image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80', discount: 50, promotion_link: '#' },
]
