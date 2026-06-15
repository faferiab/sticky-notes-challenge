import { useState, type ReactNode } from 'react'
import './FocusRing.css'

interface FocusRingProps {
  children: ReactNode
}

export function FocusRing({ children }: FocusRingProps) {
  const [focused, setFocused] = useState(false)

  return (
    <span
      className={`atom-focus-ring${focused ? ' atom-focus-ring--focused' : ''}`}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </span>
  )
}
