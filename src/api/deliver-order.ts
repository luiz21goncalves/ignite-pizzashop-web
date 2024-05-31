import { api } from '@/lib/axios'

type DeliverOrderParam = {
  orderId: string
}

export async function deliverOrder({ orderId }: DeliverOrderParam) {
  await api.patch(`/orders/${orderId}/deliver`)
}
