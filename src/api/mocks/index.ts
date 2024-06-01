import { setupWorker } from 'msw/browser'

import { ENV } from '@/env'

export const worker = setupWorker()

export async function enableMSW() {
  if (ENV.MODE === 'test') {
    await worker.start()
  }
}
