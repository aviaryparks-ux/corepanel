import { promises as fs } from 'fs'
import path from 'path'

export interface Member {
  id: string
  name: string
  email: string
  phone: string
  address: string
  photo: string // base64
  memberId: string // formatted member ID like "MR-001"
  discount: number // discount percentage
  joinDate: string
  updatedAt: string
}

const DATA_FILE = path.join(process.cwd(), 'data', 'members.json')

async function ensureDataDir() {
  const dir = path.dirname(DATA_FILE)
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch {
    // already exists
  }
}

export async function getMembers(): Promise<Member[]> {
  try {
    await ensureDataDir()
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function getMember(id: string): Promise<Member | null> {
  const members = await getMembers()
  return members.find(m => m.id === id) || null
}

export async function getMemberByMemberId(memberId: string): Promise<Member | null> {
  const members = await getMembers()
  return members.find(m => m.memberId === memberId) || null
}

function generateMemberId(members: Member[]): string {
  const num = members.length + 1
  return `MR-${num.toString().padStart(4, '0')}`
}

export async function addMember(member: Omit<Member, 'id' | 'memberId' | 'joinDate' | 'updatedAt'>): Promise<Member> {
  const members = await getMembers()
  
  const newMember: Member = {
    ...member,
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    memberId: generateMemberId(members),
    joinDate: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  
  members.push(newMember)
  await ensureDataDir()
  await fs.writeFile(DATA_FILE, JSON.stringify(members, null, 2))
  return newMember
}

export async function updateMember(id: string, updates: Partial<Member>): Promise<Member | null> {
  const members = await getMembers()
  const index = members.findIndex(m => m.id === id)
  if (index === -1) return null
  
  members[index] = {
    ...members[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  await fs.writeFile(DATA_FILE, JSON.stringify(members, null, 2))
  return members[index]
}

export async function deleteMember(id: string): Promise<boolean> {
  const members = await getMembers()
  const filtered = members.filter(m => m.id !== id)
  if (filtered.length === members.length) return false
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2))
  return true
}

export function toCSV(members: Member[]): string {
  const headers = ['Member ID', 'Name', 'Email', 'Phone', 'Address', 'Discount %', 'Join Date']
  const rows = members.map(m => [
    m.memberId,
    m.name,
    m.email,
    m.phone,
    m.address,
    m.discount.toString(),
    m.joinDate
  ])
  return [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
}