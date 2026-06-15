import { useRef, useEffect, type TextareaHTMLAttributes } from 'react'
import './TextArea.css'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string
}

export function TextArea({ value, className = '', ...props }: TextAreaProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = ref.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    }
  }, [value])

  return (
    <textarea
      ref={ref}
      className={`atom-textarea ${className}`}
      value={value}
      placeholder="Type here..."
      {...props}
    />
  )
}
