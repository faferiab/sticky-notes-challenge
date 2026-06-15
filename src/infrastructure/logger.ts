export interface Logger {
  info(message: string, data?: Record<string, unknown>): void
  warn(message: string, data?: Record<string, unknown>): void
  error(message: string, data?: Record<string, unknown>): void
}

export class ConsoleLogger implements Logger {
  info(message: string, data?: Record<string, unknown>): void {
    console.info(`[StickyNotes] ${message}`, data ?? '')
  }

  warn(message: string, data?: Record<string, unknown>): void {
    console.warn(`[StickyNotes] ${message}`, data ?? '')
  }

  error(message: string, data?: Record<string, unknown>): void {
    console.error(`[StickyNotes] ${message}`, data ?? '')
  }
}
