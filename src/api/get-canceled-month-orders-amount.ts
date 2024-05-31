import { api } from '@/lib/axios'

type GetCanceledMonthOrdersAmountResponse = {
  amount: number
  diffFromLastMonth: number
}

export async function getCanceledMonthOrdersAmount() {
  const response = await api.get<GetCanceledMonthOrdersAmountResponse>(
    '/metrics/month-canceled-orders-amount',
  )

  return response.data
}
