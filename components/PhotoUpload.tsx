'use client'

import { useState, useRef } from 'react'
import { Upload, X } from '@/components/Icons'

interface PhotoUploadProps {
  value: string
  onChange: (base64: string) => void
}

export default function PhotoUpload({ value, onChange }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      onChange(result)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  if (value) {
    return (
      <div className="relative w-40 h-40 mx-auto">
        <img 
          src={value} 
          alt="Preview" 
          className="w-full h-full object-cover rounded-xl border-4 border-blue-200"
        />
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    )
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`
        w-40 h-40 mx-auto border-4 border-dashed rounded-xl
        flex flex-col items-center justify-center gap-2 cursor-pointer
        transition-all duration-200
        ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}
      `}
    >
      <Upload className="text-gray-400" size={32} />
      <span className="text-sm text-gray-500">Drop or click to upload</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />
    </div>
  )
}