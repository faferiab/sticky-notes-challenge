import { type TextareaHTMLAttributes } from 'react'
import './TextArea.css'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string
}

export function TextArea({ value, className = '', ...props }: TextAreaProps) {
  return (
    <textarea
      className={`atom-textarea ${className}`}
      value={value}
      placeholder="Type here..."
      {...props}
    />
  )
}
