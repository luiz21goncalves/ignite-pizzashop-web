import { api } from '@/lib/axios'

export type RegistaurantBody = {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

export async function registerRestaurant({
  email,
  managerName,
  phone,
  restaurantName,
}: RegistaurantBody) {
  await api.post('/restaurants', { email, managerName, phone, restaurantName })
}
