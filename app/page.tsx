'use client'
import { useState } from 'react'
import { ShoppingBag, Zap, Globe, TrendingUp, Star, ArrowRight, Menu, X } from 'lucide-react'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            VEXORA
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="/products" className="hover:text-white transition">Products</a>
            <a href="/cpa" className="hover:text-white transition">Earn</a>
            <a href="/cart" className="hover:text-white transition">Cart</a>
            <a href="/dashboard" className="hover:text-white transition">Dashboard</a>
            <a href="/products" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition">
              Shop Now
            </a>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-black/95 px-4 py-4 flex flex-col gap-4 text-gray-400">
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="/products" onClick={() => setMenuOpen(false)}>Products</a>
            <a href="/cpa" onClick={() => setMenuOpen(false)}>Earn</a>
            <a href="/cart" onClick={() => setMenuOpen(false)}>Cart</a>
            <a href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</a>
            <a href="/products" className="bg-purple-600 text-white px-4 py-2 rounded-full text-center">Shop Now</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-purple-900/30 border border-purple-500/30 text-purple-400 text-sm px-4 py-1 rounded-full mb-6">
            🚀 AI-Powered Global Store
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Shop Smarter,
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Live Better</span>
          </h1>
          <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
            AI-powered store with thousands of products. Best prices, worldwide shipping, 24/7 AI support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/products" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition">
              Start Shopping <ArrowRight size={20} />
            </a>
            <a href="/cpa" className="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-full font-bold text-lg transition">
              Start Earning
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 border-y border-white/10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '10K+', label: 'Products' },
            { value: '150+', label: 'Countries' },
            { value: '24/7', label: 'AI Support' },
            { value: '99%', label: 'Satisfaction' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4">Why <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">VEXORA?</span></h2>
          <p className="text-gray-400 text-center mb-12">Everything you need, powered by AI</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Zap size={32} />, title: 'AI Powered', desc: 'Smart recommendations just for you' },
              { icon: <Globe size={32} />, title: 'Worldwide', desc: 'Ship to 150+ countries fast' },
              { icon: <ShoppingBag size={32} />, title: '10K+ Products', desc: 'All categories, best prices' },
              { icon: <TrendingUp size={32} />, title: 'Best Deals', desc: 'AI finds lowest prices daily' },
            ].map((f) => (
              <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition">
                <div className="text-purple-400 mb-4">{f.icon}</div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="products" className="py-20 px-4 bg-white/2">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12">Shop by <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Category</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { emoji: '🏠', name: 'Home & Living', count: '2.5K+ items' },
              { emoji: '📱', name: 'Electronics', count: '1.8K+ items' },
              { emoji: '👗', name: 'Fashion', count: '3K+ items' },
              { emoji: '💪', name: 'Gym & Fitness', count: '800+ items' },
              { emoji: '💄', name: 'Beauty', count: '1.2K+ items' },
              { emoji: '🧸', name: 'Kids & Toys', count: '900+ items' },
            ].map((cat) => (
              <a href="/products" key={cat.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 hover:bg-white/10 transition cursor-pointer text-center">
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <h3 className="font-bold mb-1">{cat.name}</h3>
                <p className="text-gray-400 text-sm">{cat.count}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Earn Section */}
      <section id="earn" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">Earn with <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">VEXORA</span></h2>
          <p className="text-gray-400 mb-12">Join our affiliate program and earn commission on every sale</p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { value: '20%', label: 'Commission Rate' },
              { value: '$500+', label: 'Avg Monthly Earning' },
              { value: '30 days', label: 'Cookie Duration' },
            ].map((item) => (
              <div key={item.label} className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-2xl p-6">
                <div className="text-3xl font-black text-purple-400 mb-2">{item.value}</div>
                <div className="text-gray-400">{item.label}</div>
              </div>
            ))}
          </div>
          <a href="/cpa" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white px-8 py-4 rounded-full font-bold text-lg transition inline-block">
            Join Affiliate Program
          </a>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 px-4 bg-white/2">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12">What Customers <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Say</span></h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah K.', review: 'Amazing products and super fast delivery! AI recommendations are spot on.', rating: 5 },
              { name: 'Ahmed R.', review: 'Best prices I found anywhere. Customer support is incredible!', rating: 5 },
              { name: 'Lisa M.', review: 'Love the variety of products. Will definitely shop again!', rating: 5 },
            ].map((r) => (
              <div key={r.name} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex mb-3">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-300 mb-4 text-sm">"{r.review}"</p>
                <div className="font-bold text-sm">{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            VEXORA
          </div>
          <p className="text-gray-400 text-sm mb-6">Shop Smarter, Live Better</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
            <a href="/cpa" className="hover:text-white transition">Affiliate</a>
            <a href="/dashboard" className="hover:text-white transition">Dashboard</a>
          </div>
          <p className="text-gray-600 text-xs mt-6">© 2026 VEXORA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
