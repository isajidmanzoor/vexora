'use client'
import { useState } from 'react'
import { DollarSign, TrendingUp, Users, Zap, CheckCircle, ArrowRight, Copy } from 'lucide-react'

export default function CPAPage() {
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText('https://vexora.com/ref/USER123')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleJoin = () => {
    if (email) setJoined(true)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            VEXORA
          </a>
          <a href="/" className="text-gray-400 hover:text-white transition text-sm">← Back to Store</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-green-900/30 border border-green-500/30 text-green-400 text-sm px-4 py-1 rounded-full mb-6">
            💰 Earn Money with VEXORA CPA
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Earn <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">$100+</span>
            <br />Daily
          </h1>
          <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
            Share your link. Someone clicks. You earn. No product needed. No investment required.
          </p>
          <button
            onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition mx-auto"
          >
            Start Earning Now <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 border-y border-white/10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '$50', label: 'Per Sale' },
            { value: '20%', label: 'Commission' },
            { value: '5K+', label: 'Active Affiliates' },
            { value: '$2M+', label: 'Paid Out' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4">How It <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Works</span></h2>
          <p className="text-gray-400 text-center mb-12">3 simple steps to start earning</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', icon: <Users size={32} />, title: 'Join Free', desc: 'Sign up in 30 seconds. No credit card needed.' },
              { step: '02', icon: <Copy size={32} />, title: 'Share Link', desc: 'Get your unique link. Share on social media, WhatsApp, anywhere.' },
              { step: '03', icon: <DollarSign size={32} />, title: 'Get Paid', desc: 'Earn commission for every sale. Withdraw anytime.' },
            ].map((item) => (
              <div key={item.step} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-green-500/50 transition text-center">
                <div className="text-green-400/30 text-6xl font-black mb-4">{item.step}</div>
                <div className="text-green-400 mb-4 flex justify-center">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earning Calculator */}
      <section className="py-20 px-4 bg-white/2">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4">Earning <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Calculator</span></h2>
          <p className="text-gray-400 text-center mb-12">See how much you can earn</p>
          <EarningCalculator />
        </div>
      </section>

      {/* CPA Networks */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4">Top CPA <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Networks</span></h2>
          <p className="text-gray-400 text-center mb-12">We work with the best networks</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: 'MaxBounty', commission: '$1-50/action', type: 'CPA', rating: '⭐⭐⭐⭐⭐' },
              { name: 'ClickBank', commission: '10-75%/sale', type: 'Revenue Share', rating: '⭐⭐⭐⭐⭐' },
              { name: 'ShareASale', commission: '$1-30/action', type: 'CPA', rating: '⭐⭐⭐⭐' },
              { name: 'Digistore24', commission: '40-70%/sale', type: 'Revenue Share', rating: '⭐⭐⭐⭐⭐' },
            ].map((network) => (
              <div key={network.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between hover:border-green-500/50 transition">
                <div>
                  <h3 className="font-bold text-lg">{network.name}</h3>
                  <p className="text-green-400 text-sm">{network.commission}</p>
                  <p className="text-gray-400 text-xs">{network.type}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm">{network.rating}</div>
                  <button className="mt-2 bg-green-600/20 border border-green-500/30 text-green-400 text-xs px-3 py-1 rounded-full hover:bg-green-600/40 transition">
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Form */}
      <section id="join" className="py-20 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-4xl font-black text-center mb-4">Join <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Free</span></h2>
          <p className="text-gray-400 text-center mb-8">Start earning in 30 seconds</p>
          {!joined ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 mb-4 focus:outline-none focus:border-green-500"
              />
              <button
                onClick={handleJoin}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 text-white py-3 rounded-xl font-bold transition"
              >
                Get My Affiliate Link
              </button>
              <p className="text-gray-500 text-xs text-center mt-3">Free forever. No credit card required.</p>
            </div>
          ) : (
            <div className="bg-white/5 border border-green-500/30 rounded-2xl p-6 text-center">
              <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Welcome to VEXORA! 🎉</h3>
              <p className="text-gray-400 text-sm mb-4">Your affiliate link:</p>
              <div className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between mb-4">
                <span className="text-green-400 text-sm">vexora.com/ref/USER123</span>
                <button onClick={copyLink} className="text-gray-400 hover:text-white transition">
                  {copied ? <CheckCircle size={16} className="text-green-400" /> : <Copy size={16} />}
                </button>
              </div>
              <p className="text-gray-400 text-xs">Share this link and earn 20% on every sale!</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 text-center">
        <div className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">VEXORA</div>
        <p className="text-gray-600 text-xs">© 2026 VEXORA. All rights reserved.</p>
      </footer>
    </div>
  )
}

function EarningCalculator() {
  const [sales, setSales] = useState(10)
  const commission = 20
  const avgOrder = 50
  const daily = Math.round((sales * avgOrder * commission) / 100)

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="mb-6">
        <label className="text-gray-400 text-sm mb-2 block">Daily Sales: <span className="text-white font-bold">{sales}</span></label>
        <input
          type="range"
          min="1"
          max="100"
          value={sales}
          onChange={(e) => setSales(Number(e.target.value))}
          className="w-full accent-green-500"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        {[
          { label: 'Daily', value: `$${daily}` },
          { label: 'Monthly', value: `$${daily * 30}` },
          { label: 'Yearly', value: `$${daily * 365}` },
        ].map((item) => (
          <div key={item.label} className="bg-green-900/20 border border-green-500/20 rounded-xl p-3">
            <div className="text-2xl font-black text-green-400">{item.value}</div>
            <div className="text-gray-400 text-xs">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
