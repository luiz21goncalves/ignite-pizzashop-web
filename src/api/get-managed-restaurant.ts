import { api } from '@/lib/axios'

export async function getManagedRestaurant() {
  const response = await api.get('/managed-restaurant')

  return response.data
}
