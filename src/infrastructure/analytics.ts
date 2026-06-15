export interface Analytics {
  track(event: string, data?: Record<string, unknown>): void
}

export class NoopAnalytics implements Analytics {
  track(_event: string, _data?: Record<string, unknown>): void {}
}
