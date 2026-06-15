import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useDrag } from '../../src/hooks/useDrag'
import { useResize } from '../../src/hooks/useResize'
import { useNoteStore } from '../../src/store'

describe('useDrag', () => {
  beforeEach(() => {
    useNoteStore.setState({ notes: [], activeNoteId: null })
  })

  it('returns a function', () => {
    const { result } = renderHook(() => useDrag())
    expect(typeof result.current).toBe('function')
  })
})

describe('useResize', () => {
  beforeEach(() => {
    useNoteStore.setState({ notes: [], activeNoteId: null })
  })

  it('returns a function', () => {
    const { result } = renderHook(() => useResize())
    expect(typeof result.current).toBe('function')
  })
})
