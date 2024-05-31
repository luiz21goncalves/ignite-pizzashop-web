import { api } from '@/lib/axios'

export type OrderStatusType =
  | 'pending'
  | 'processing'
  | 'delivering'
  | 'delivered'
  | 'canceled'

export type GetOrdersResponse = {
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
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}

export async function getOrders({
  pageIndex,
  customerName,
  orderId,
  status,
}: GetOrdersQuery) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: { pageIndex, orderId, customerName, status },
  })

  return response.data
}
