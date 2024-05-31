import { api } from '@/lib/axios'

type DispatchOrderParam = {
  orderId: string
}

export async function dispatchOrder({ orderId }: DispatchOrderParam) {
  await api.patch(`/orders/${orderId}/dispatch`)
}
