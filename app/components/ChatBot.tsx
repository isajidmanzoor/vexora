'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot } from 'lucide-react'

interface Message {
  role: 'user' | 'bot'
  text: string
}

const autoReplies: Record<string, string> = {
  'hello': 'Hi! Welcome to VEXORA! 👋 How can I help you today?',
  'hi': 'Hey there! 😊 Looking for something special today?',
  'price': 'We have amazing deals! All products are 50% off. Check our /products page!',
  'shipping': 'We ship worldwide 🌍 to 150+ countries. Free shipping on orders over $50!',
  'return': 'We have a 30-day return policy. No questions asked! 😊',
  'payment': 'We accept Credit Card, PayPal, and Crypto! 💳',
  'discount': 'Use code VEXORA20 for extra 20% off! 🎉',
  'track': 'You can track your order at /track. Enter your order ID!',
  'help': 'I can help with: pricing, shipping, returns, payments, discounts! Just ask 😊',
  'bye': 'Goodbye! Happy shopping! 🛍️',
}

function getBotReply(msg: string): string {
  const lower = msg.toLowerCase()
  for (const key of Object.keys(autoReplies)) {
    if (lower.includes(key)) return autoReplies[key]
  }
  return "Great question! Let me connect you with our team. Meanwhile, check our /products page for amazing deals! 🛍️"
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hi! 👋 I am VEXORA AI Assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { role: 'bot', text: getBotReply(userMsg) }])
    }, 1000)
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">VEXORA AI</div>
              <div className="text-white/70 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
                Online
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-purple-600 text-white rounded-br-sm'
                    : 'bg-white/10 text-gray-200 rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-gray-400 px-3 py-2 rounded-2xl rounded-bl-sm text-sm">
                  Typing...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-3 py-2 flex gap-2 overflow-x-auto border-t border-white/10">
            {['Shipping', 'Discount', 'Return', 'Help'].map(q => (
              <button
                key={q}
                onClick={() => {
                  setInput(q)
                  setTimeout(() => send(), 100)
                }}
                className="whitespace-nowrap text-xs bg-white/10 hover:bg-white/20 text-gray-300 px-3 py-1 rounded-full transition"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Type a message..."
              className="flex-1 bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={send}
              className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-xl transition"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
