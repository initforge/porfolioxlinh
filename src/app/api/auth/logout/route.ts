import { NextRequest, NextResponse } from 'next/server'
import { removeAuthCookie } from '@/lib/firebase/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    await removeAuthCookie()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}

