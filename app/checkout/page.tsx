'use client'
import { useState } from 'react'
import { CreditCard, Lock, CheckCircle, ArrowRight } from 'lucide-react'

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', country: '',
    card: '', expiry: '', cvv: ''
  })

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }))

  const placeOrder = () => {
    setDone(true)
  }

  if (done) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <CheckCircle size={80} className="text-green-400 mx-auto mb-6" />
        <h1 className="text-4xl font-black mb-4">Order Placed! 🎉</h1>
        <p className="text-gray-400 mb-2">Thank you <span className="text-white font-bold">{form.name || 'Customer'}</span>!</p>
        <p className="text-gray-400 mb-8">Order confirmation sent to <span className="text-purple-400">{form.email || 'your email'}</span></p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8 text-left">
          <p className="text-sm text-gray-400">Order ID: <span className="text-white font-bold">#VEX{Math.floor(Math.random() * 90000) + 10000}</span></p>
          <p className="text-sm text-gray-400 mt-1">Estimated delivery: <span className="text-green-400 font-bold">5-7 Business Days</span></p>
        </div>
        <a href="/products" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-bold">
          Continue Shopping
        </a>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">VEXORA</a>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Lock size={14} className="text-green-400" />
            Secure Checkout
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-8">
          {['Shipping', 'Payment', 'Review'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > i + 1 ? 'bg-green-500' : step === i + 1 ? 'bg-purple-600' : 'bg-white/10'}`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`text-sm ${step === i + 1 ? 'text-white' : 'text-gray-500'}`}>{s}</span>
              {i < 2 && <div className="w-8 h-px bg-white/20" />}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {/* Step 1 - Shipping */}
            {step === 1 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h2 className="font-bold text-lg">Shipping Information</h2>
                {[
                  { key: 'name', placeholder: 'Full Name', type: 'text' },
                  { key: 'email', placeholder: 'Email Address', type: 'email' },
                  { key: 'phone', placeholder: 'Phone Number', type: 'tel' },
                  { key: 'address', placeholder: 'Street Address', type: 'text' },
                  { key: 'city', placeholder: 'City', type: 'text' },
                  { key: 'country', placeholder: 'Country', type: 'text' },
                ].map(field => (
                  <input
                    key={field.key}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={e => update(field.key, e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                ))}
                <button onClick={() => setStep(2)} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                  Continue to Payment <ArrowRight size={16} />
                </button>
              </div>
            )}

            {/* Step 2 - Payment */}
            {step === 2 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <CreditCard size={20} className="text-purple-400" /> Payment Details
                </h2>
                <input
                  type="text"
                  placeholder="Card Number (1234 5678 9012 3456)"
                  value={form.card}
                  onChange={e => update('card', e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={e => update('expiry', e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={form.cvv}
                    onChange={e => update('cvv', e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 border border-white/20 text-white py-3 rounded-xl font-bold">
                    Back
                  </button>
                  <button onClick={() => setStep(3)} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                    Review Order <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 - Review */}
            {step === 3 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h2 className="font-bold text-lg">Review Order</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Name</span><span className="text-white">{form.name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Email</span><span className="text-white">{form.email || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Address</span><span className="text-white">{form.address || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Card</span><span className="text-white">**** **** **** {form.card.slice(-4) || '****'}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="flex-1 border border-white/20 text-white py-3 rounded-xl font-bold">
                    Back
                  </button>
                  <button onClick={placeOrder} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                    Place Order ✓
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit">
            <h2 className="font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-400"><span>💡 Smart LED Strip</span><span>$29.99</span></div>
              <div className="flex justify-between text-gray-400"><span>🎧 Earbuds Pro x2</span><span>$99.98</span></div>
              <div className="flex justify-between text-gray-400"><span>🧘 Yoga Mat</span><span>$24.99</span></div>
              <div className="border-t border-white/10 pt-3 flex justify-between text-gray-400"><span>Shipping</span><span className="text-green-400">FREE</span></div>
              <div className="flex justify-between font-black text-white text-lg"><span>Total</span><span>$154.96</span></div>
            </div>
            <div className="mt-4 text-center text-xs text-gray-500">
              🔒 256-bit SSL Secured
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
