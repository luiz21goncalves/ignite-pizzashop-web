import { api } from '@/lib/axios'

type GetPopularProducts = Array<{
  product: string
  amount: number
}>

export async function getPopularProducts() {
  const response = await api.get<GetPopularProducts>(
    '/metrics/popular-products',
  )

  return response.data
}
