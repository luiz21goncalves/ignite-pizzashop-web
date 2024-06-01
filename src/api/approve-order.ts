import { api } from '@/lib/axios'

export type ApproveOrderParam = {
  orderId: string
}

export async function approveOrder({ orderId }: ApproveOrderParam) {
  await api.patch(`/orders/${orderId}/approve`)
}
