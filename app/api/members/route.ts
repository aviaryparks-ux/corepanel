import { NextRequest, NextResponse } from 'next/server'
import { getMembers, addMember } from '@/lib/db'

export async function GET() {
  const members = await getMembers()
  return NextResponse.json(members)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  if (!body.name || !body.email || !body.phone) {
    return NextResponse.json({ error: 'Nama, email, dan telepon wajib diisi' }, { status: 400 })
  }

  const member = await addMember({
    name: body.name,
    email: body.email,
    phone: body.phone,
    address: body.address || '',
    photo: body.photo || '',
    discount: body.discount || 10,
  })

  return NextResponse.json(member, { status: 201 })
}