import axios from 'axios'

import { ENV } from '@/env'

export const api = axios.create({
  baseURL: ENV.VITE_API_URL,
  withCredentials: true,
})

if (ENV.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )

    return config
  })
}
