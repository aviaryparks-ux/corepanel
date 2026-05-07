import { NextResponse } from 'next/server'
import { getMembers, toCSV } from '@/lib/db'

export async function GET() {
  const members = await getMembers()
  const csv = toCSV(members)
  
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="members.csv"',
    },
  })
}