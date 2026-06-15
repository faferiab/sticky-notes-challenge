import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TrashZone } from '../../src/components/organisms/TrashZone'

describe('TrashZone', () => {
  it('renders inactive state', () => {
    render(<TrashZone active={false} />)
    expect(screen.getByText('Drag notes here to delete')).toBeInTheDocument()
  })

  it('renders active state', () => {
    render(<TrashZone active={true} />)
    expect(screen.getByText('Drop to delete')).toBeInTheDocument()
  })

  it('has accessible region label', () => {
    render(<TrashZone active={false} />)
    expect(screen.getByRole('region', { name: /trash zone/i })).toBeInTheDocument()
  })
})
