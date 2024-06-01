import { api } from '@/lib/axios'

export type DeliverOrderParam = {
  orderId: string
}

export async function deliverOrder({ orderId }: DeliverOrderParam) {
  await api.patch(`/orders/${orderId}/deliver`)
}
