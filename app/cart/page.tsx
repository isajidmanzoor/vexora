'use client'
import { useState } from 'react'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'

const initialItems = [
  { id: 1, name: 'Smart LED Strip Lights', price: 29.99, qty: 1, emoji: '💡' },
  { id: 2, name: 'Wireless Earbuds Pro', price: 49.99, qty: 2, emoji: '🎧' },
  { id: 3, name: 'Yoga Mat Premium', price: 24.99, qty: 1, emoji: '🧘' },
]

export default function CartPage() {
  const [items, setItems] = useState(initialItems)

  const updateQty = (id: number, delta: number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ))
  }

  const remove = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">VEXORA</a>
          <a href="/products" className="text-gray-400 hover:text-white text-sm transition">← Continue Shopping</a>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-8">Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Cart</span></h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag size={64} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-xl mb-6">Your cart is empty</p>
            <a href="/products" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-bold transition">
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Items */}
            <div className="md:col-span-2 space-y-4">
              {items.map(item => (
                <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl flex items-center justify-center text-3xl">
                    {item.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <p className="text-purple-400 font-bold">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center font-bold">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${(item.price * item.qty).toFixed(2)}</p>
                    <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-300 mt-1 transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-400">FREE</span> : `$${shipping}`}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-500 mb-4">Add ${(50 - subtotal).toFixed(2)} more for free shipping!</p>
              )}
              <a href="/checkout" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2">
                Checkout <ArrowRight size={16} />
              </a>
              <div className="mt-3 text-center text-xs text-gray-500">
                🔒 Secure checkout
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
