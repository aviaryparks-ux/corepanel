import { NextRequest, NextResponse } from 'next/server'
import { getMembers, addMember, getMember } from '@/lib/db'

export async function GET() {
  const members = await getMembers()
  return NextResponse.json(members)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  if (!body.name || !body.email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }

  const member = await addMember({
    name: body.name,
    email: body.email,
    address: body.address || '',
    photo: body.photo || '',
  })

  return NextResponse.json(member, { status: 201 })
}