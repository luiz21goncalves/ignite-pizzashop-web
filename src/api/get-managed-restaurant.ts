import { api } from '@/lib/axios'

export type GetManagedRestaurantResponse = {
  id: string
  name: string
  description: string | null
  managerId: string | null
  createdAt: string
  updatedAt: string
}

export async function getManagedRestaurant() {
  const response = await api.get<GetManagedRestaurantResponse>(
    '/managed-restaurant',
  )

  return response.data
}
