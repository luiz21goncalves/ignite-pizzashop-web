import { api } from '@/lib/axios'

export type OrderStatusType =
  | 'pending'
  | 'processing'
  | 'delivering'
  | 'delivered'
  | 'canceled'

type GetOrdersResponse = {
  orders: Array<{
    orderId: string
    createdAt: string
    status: OrderStatusType
    totalInCents: number
    customerName: string
  }>
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders() {
  const response = await api.get<GetOrdersResponse>('/orders')

  return response.data
}
