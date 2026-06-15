import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  children: ReactNode
}

export function IconButton({ label, className = '', children, ...props }: IconButtonProps) {
  return (
    <button type="button" aria-label={label} className={`atom-button ${className}`} {...props}>
      {children}
    </button>
  )
}
