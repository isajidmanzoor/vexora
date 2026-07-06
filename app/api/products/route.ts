import { NextResponse } from 'next/server'
import crypto from 'crypto'

const APP_KEY = process.env.ALIEXPRESS_APP_KEY!
const APP_SECRET = process.env.ALIEXPRESS_APP_SECRET!

let lastSortedString = ''
function sign(params: Record<string, string>) {
  const sorted = Object.keys(params).sort().map(k => `${k}${params[k]}`).join('')
  lastSortedString = sorted
  return crypto.createHmac('sha256', APP_SECRET).update(sorted).digest('hex').toUpperCase()
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const keywords = searchParams.get('keywords') || 'trending'
  const category = searchParams.get('category') || ''

  const params: Record<string, string> = {
    app_key: APP_KEY,
    method: 'aliexpress.affiliate.product.query',
    timestamp: String(Date.now()),
    v: '2.0',
    tracking_id: 'vexora',
    sign_method: 'sha256',
    keywords,
    target_currency: 'USD',
    target_language: 'EN',
    page_no: '1',
    page_size: '20',
  }
  if (category) params.category_ids = category

  params.sign = sign(params)

  // Build query string WITHOUT URL-encoding, per AliExpress's own guidance
  const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&')
  const url = `https://api-sg.aliexpress.com/sync?${query}`

  try {
    const res = await fetch(url)
    const data = await res.json()
    const products = data?.aliexpress_affiliate_product_query_response?.resp_result?.result?.products?.product || []
    return NextResponse.json({ products, _debug: data, _sign_debug: { sorted_string: lastSortedString, app_key: APP_KEY, sign: params.sign, timestamp: params.timestamp, full_url: url } })
  } catch (err) {
    return NextResponse.json({ products: [], error: 'Failed to fetch', _debug: String(err) })
  }
}
