import { Member } from '@/lib/db'

interface NametagCardProps {
  member: Member
  size?: 'sm' | 'md' | 'lg'
}

export default function NametagCard({ member, size = 'md' }: NametagCardProps) {
  const sizes = {
    sm: { card: 'w-48 h-32', photo: 'w-16 h-16', text: 'text-xs' },
    md: { card: 'w-72 h-48', photo: 'w-24 h-24', text: 'text-sm' },
    lg: { card: 'w-96 h-64', photo: 'w-32 h-32', text: 'text-base' },
  }

  const s = sizes[size]

  return (
    <div className={`
      ${s.card} bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl
      flex overflow-hidden text-white
    `}>
      {/* Photo Section */}
      <div className={`${s.photo} m-3 rounded-xl overflow-hidden bg-white flex-shrink-0`}>
        {member.photo ? (
          <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-blue-200 flex items-center justify-center text-blue-600 font-bold text-2xl">
            {member.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      
      {/* Info Section */}
      <div className="flex-1 p-3 flex flex-col justify-center">
        <h3 className={`${s.text} font-bold mb-1`}>{member.name}</h3>
        <div className={`${s.text} opacity-80 truncate`}>{member.email}</div>
        <div className={`${s.text} opacity-60 text-xs mt-1 truncate`}>{member.address}</div>
      </div>
    </div>
  )
}