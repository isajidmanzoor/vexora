import { NextResponse } from 'next/server'
import crypto from 'crypto'

const APP_KEY = process.env.ALIEXPRESS_APP_KEY!
const APP_SECRET = process.env.ALIEXPRESS_APP_SECRET!

function getShanghaiTimestamp() {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  }).formatToParts(now)
  const map: Record<string, string> = {}
  for (const p of parts) map[p.type] = p.value
  return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute}:${map.second}`
}

function sign(params: Record<string, string>) {
  const sorted = Object.keys(params).sort().map(k => `${k}${params[k]}`).join('')
  const wrapped = APP_SECRET + sorted + APP_SECRET
  return crypto.createHash('md5').update(wrapped, 'utf8').digest('hex').toUpperCase()
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const keywords = searchParams.get('keywords') || 'trending'
  const category = searchParams.get('category') || ''

  const params: Record<string, string> = {
    app_key: APP_KEY,
    timestamp: getShanghaiTimestamp(),
    sign_method: 'md5',
    format: 'json',
    v: '2.0',
    method: 'aliexpress.affiliate.product.query',
    keywords,
    target_currency: 'USD',
    target_language: 'EN',
    page_no: '1',
    page_size: '20',
    tracking_id: 'vexora',
  }
  if (category) params.category_ids = category

  params.sign = sign(params)

  const url = 'https://gw.api.taobao.com/router/rest'
  const body = new URLSearchParams(params).toString()

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      body,
    })
    const data = await res.json()
    const products = data?.aliexpress_affiliate_product_query_response?.resp_result?.result?.products?.product || []
    return NextResponse.json({ products, _debug: data })
  } catch (err) {
    return NextResponse.json({ products: [], error: 'Failed to fetch', _debug: String(err) })
  }
}
