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

type GetOrdersQuery = {
  pageIndex?: number
}

export async function getOrders({ pageIndex }: GetOrdersQuery) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: { pageIndex },
  })

  return response.data
}
