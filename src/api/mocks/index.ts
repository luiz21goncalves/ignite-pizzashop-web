import { setupWorker } from 'msw/browser'

import { ENV } from '@/env'

import { signInMock } from './sign-in-mock'

export const worker = setupWorker(signInMock)

export async function enableMSW() {
  if (ENV.MODE === 'test') {
    await worker.start()
  }
}
