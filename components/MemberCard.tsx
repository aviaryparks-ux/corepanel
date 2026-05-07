import { Member } from '@/lib/db'

interface MemberCardProps {
  member: Member
  size?: 'sm' | 'md' | 'lg'
}

export default function MemberCard({ member, size = 'md' }: MemberCardProps) {
  const sizes = {
    sm: { card: 'w-64 h-40', photo: 'w-16 h-16', text: 'text-xs', title: 'text-sm' },
    md: { card: 'w-80 h-48', photo: 'w-20 h-20', text: 'text-sm', title: 'text-base' },
    lg: { card: 'w-96 h-56', photo: 'w-24 h-24', text: 'text-base', title: 'text-lg' },
  }

  const s = sizes[size]

  return (
    <div className={`
      ${s.card} relative bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-2xl overflow-hidden text-white
    `}>
      {/* Header stripe */}
      <div className="absolute top-0 left-0 right-0 bg-black/20 h-8 flex items-center px-4">
        <span className="font-bold text-sm tracking-wider">MEMBER CARD</span>
        <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded">{member.memberId}</span>
      </div>
      
      {/* Content */}
      <div className="pt-10 px-4 pb-4 flex gap-4">
        {/* Photo */}
        <div className={`${s.photo} rounded-xl overflow-hidden bg-white flex-shrink-0 shadow-lg`}>
          {member.photo ? (
            <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-amber-200 flex items-center justify-center text-amber-600 font-bold text-3xl">
              {member.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        {/* Info */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className={`${s.title} font-bold mb-1`}>{member.name}</h3>
          <div className={`${s.text} opacity-90`}>{member.email}</div>
          <div className={`${s.text} opacity-75`}>{member.phone}</div>
          {member.address && (
            <div className={`${s.text} opacity-60 text-xs mt-1 truncate`}>{member.address}</div>
          )}
        </div>
        
        {/* Discount Badge */}
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white text-amber-600 rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-lg">
            <span className="text-2xl font-bold">{member.discount}%</span>
            <span className="text-xs">OFF</span>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/30 px-4 py-2 flex items-center justify-between text-xs">
        <span>Bergabung: {new Date(member.joinDate).toLocaleDateString('id-ID')}</span>
        <span className="font-bold">RESTORAN KAMI</span>
      </div>
    </div>
  )
}