import { NextResponse } from 'next/server'

export async function GET() {
  const key = process.env.ALIEXPRESS_APP_KEY || ''
  const secret = process.env.ALIEXPRESS_APP_SECRET || ''
  return NextResponse.json({
    key_length: key.length,
    key_trimmed_length: key.trim().length,
    secret_length: secret.length,
    secret_trimmed_length: secret.trim().length,
    key_has_whitespace: key !== key.trim(),
    secret_has_whitespace: secret !== secret.trim(),
  })
}
