import { api } from '@/lib/axios'

import { OrderStatusType } from './get-orders'

export type GetOrderDetailsParams = {
  orderId: string
}

export type GetOrderDetailsResponse = {
  id: string
  status: OrderStatusType
  totalInCents: number
  createdAt: string
  customer: {
    name: string
    phone: null | string
    email: string
  }
  orderItems: Array<{
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }>
}

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return response.data
}
