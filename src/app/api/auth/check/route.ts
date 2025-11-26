import { NextRequest, NextResponse } from 'next/server'
import { checkAuth } from '@/lib/firebase/auth'

export async function GET(request: NextRequest) {
  try {
    const authenticated = await checkAuth()
    return NextResponse.json({ authenticated })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ authenticated: false })
  }
}

