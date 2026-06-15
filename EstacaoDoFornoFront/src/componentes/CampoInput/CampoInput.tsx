import React from 'react'
import './CampoInput.css'

interface CampoInputProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  erro?: string
  disabled?: boolean
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
}

export default function CampoInput({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  erro,
  disabled = false,
  inputMode,
}: CampoInputProps) {
  return (
    <div className={`campo-grupo ${erro ? 'campo-erro' : ''}`}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        inputMode={inputMode}
      />
      {erro && <span className="erro-msg">{erro}</span>}
    </div>
  )
}