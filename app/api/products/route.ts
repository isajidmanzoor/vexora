import { NextResponse } from 'next/server'
import { AffiliateClient } from 'ae_sdk'

const client = new AffiliateClient({
  app_key: process.env.ALIEXPRESS_APP_KEY!,
  app_secret: process.env.ALIEXPRESS_APP_SECRET!,
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const keywords = searchParams.get('keywords') || 'trending'
  const category = searchParams.get('category') || ''

  try {
    const response = await client.callAPIDirectly('aliexpress.affiliate.product.query', {
      keywords,
      target_currency: 'USD',
      target_language: 'EN',
      page_no: '1',
      page_size: '20',
      tracking_id: 'vexora',
      ...(category ? { category_ids: category } : {}),
    })

    if (!response.ok) {
      return NextResponse.json({ products: [], error: response.message, _debug: response })
    }

    const data: any = response.data
    const products = data?.aliexpress_affiliate_product_query_response?.resp_result?.result?.products?.product || []
    return NextResponse.json({ products, _debug: data })
  } catch (err) {
    return NextResponse.json({ products: [], error: 'Failed to fetch', _debug: String(err) })
  }
}
