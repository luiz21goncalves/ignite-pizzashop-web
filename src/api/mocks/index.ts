import { setupWorker } from 'msw/browser'

import { ENV } from '@/env'

import { registerRestaurantMock } from './register-restaurant-mock'
import { signInMock } from './sign-in-mock'

export const worker = setupWorker(signInMock, registerRestaurantMock)

export async function enableMSW() {
  if (ENV.MODE === 'test') {
    await worker.start()
  }
}
