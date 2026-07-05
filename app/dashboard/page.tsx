'use client'
import { useState } from 'react'
import { DollarSign, Users, TrendingUp, Copy, CheckCircle, Link, BarChart3, ArrowUpRight, RefreshCw } from 'lucide-react'

const stats = [
  { label: 'Total Earned', value: '$1,247', icon: <DollarSign size={20} />, change: '+12%', color: 'green' },
  { label: 'Total Clicks', value: '8,432', icon: <TrendingUp size={20} />, change: '+24%', color: 'purple' },
  { label: 'Conversions', value: '243', icon: <Users size={20} />, change: '+8%', color: 'blue' },
  { label: 'Pending', value: '$320', icon: <BarChart3 size={20} />, change: '+5%', color: 'yellow' },
]

const transactions = [
  { id: '#VEX10234', product: 'Smart LED Strip', commission: '$5.99', date: 'Jul 4, 2026', status: 'Paid' },
  { id: '#VEX10235', product: 'Wireless Earbuds', commission: '$9.99', date: 'Jul 3, 2026', status: 'Paid' },
  { id: '#VEX10236', product: 'Yoga Mat', commission: '$4.99', date: 'Jul 3, 2026', status: 'Pending' },
  { id: '#VEX10237', product: 'Smart Home Hub', commission: '$17.99', date: 'Jul 2, 2026', status: 'Paid' },
  { id: '#VEX10238', product: 'Skincare Kit', commission: '$6.99', date: 'Jul 1, 2026', status: 'Pending' },
]

export default function DashboardPage() {
  const [copied, setCopied] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [syncMsg, setSyncMsg] = useState<string | null>(null)
  const affLink = 'https://vexora.com/ref/USER123'

  const copy = () => {
    navigator.clipboard.writeText(affLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const syncProducts = async () => {
    setSyncing(true)
    setSyncMsg(null)
    try {
      const res = await fetch('/api/products?keywords=trending')
      const data = await res.json()
      if (data.error) {
        setSyncMsg(`Sync failed: ${data.error}`)
      } else {
        setSyncMsg(`Synced ${data.products?.length || 0} products`)
      }
    } catch (err) {
      setSyncMsg('Sync failed: network error')
    } finally {
      setSyncing(false)
      setTimeout(() => setSyncMsg(null), 4000)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">VEXORA</a>
          <div className="flex items-center gap-4">
            <a href="/products" className="text-gray-400 hover:text-white text-sm transition">Store</a>
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">S</div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black">Affiliate <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Dashboard</span></h1>
            <p className="text-gray-400 text-sm mt-1">Welcome back, Sajid! 👋</p>
          </div>
          <div className="flex items-center gap-3">
            {syncMsg && <span className="text-xs text-gray-400">{syncMsg}</span>}
            <button
              onClick={syncProducts}
              disabled={syncing}
              className="bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white px-4 py-2 rounded-full text-sm font-bold transition flex items-center gap-2"
            >
              <RefreshCw size={14} className={syncing ? 'animate-spin' : ''} />
              {syncing ? 'Syncing...' : 'Sync Products'}
            </button>
            <a href="/cpa" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-bold transition flex items-center gap-2">
              Earn More <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-purple-500/30 transition">
              <div className={`text-${stat.color}-400 mb-2`}>{stat.icon}</div>
              <div className="text-2xl font-black mb-1">{stat.value}</div>
              <div className="text-gray-400 text-xs">{stat.label}</div>
              <div className="text-green-400 text-xs mt-1">{stat.change} this week</div>
            </div>
          ))}
        </div>

        {/* Affiliate Link */}
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-2xl p-6 mb-8">
          <h2 className="font-bold mb-2 flex items-center gap-2">
            <Link size={18} className="text-purple-400" /> Your Affiliate Link
          </h2>
          <p className="text-gray-400 text-sm mb-4">Share this link and earn 20% commission on every sale!</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-purple-400 text-sm font-mono overflow-hidden">
              {affLink}
            </div>
            <button onClick={copy} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-xl transition flex items-center gap-2 text-sm font-bold">
              {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { name: 'WhatsApp', color: 'bg-green-600', emoji: '💬' },
            { name: 'Facebook', color: 'bg-blue-600', emoji: '👥' },
            { name: 'Instagram', color: 'bg-pink-600', emoji: '📸' },
          ].map(s => (
            <button key={s.name} className={`${s.color} hover:opacity-90 text-white py-3 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2`}>
              {s.emoji} {s.name}
            </button>
          ))}
        </div>

        {/* Transactions */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-bold">Recent Transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-xs border-b border-white/10">
                  <th className="text-left px-6 py-3">Order ID</th>
                  <th className="text-left px-6 py-3">Product</th>
                  <th className="text-left px-6 py-3">Commission</th>
                  <th className="text-left px-6 py-3">Date</th>
                  <th className="text-left px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(t => (
                  <tr key={t.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-6 py-4 text-sm text-purple-400 font-mono">{t.id}</td>
                    <td className="px-6 py-4 text-sm">{t.product}</td>
                    <td className="px-6 py-4 text-sm text-green-400 font-bold">{t.commission}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{t.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${t.status === 'Paid' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
