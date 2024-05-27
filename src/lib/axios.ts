import axios from 'axios'

import { ENV } from '@/env'

export const api = axios.create({
  baseURL: ENV.VITE_API_URL,
  withCredentials: true,
})
