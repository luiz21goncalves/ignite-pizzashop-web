import { api } from '@/lib/axios'

type GetMonthOrdersRevenueResponse = {
  revenue: number
  diffFromLastMonth: number
}

export async function getMonthOrdersRevenue() {
  const response = await api.get<GetMonthOrdersRevenueResponse>(
    '/metrics/month-revenue',
  )

  return response.data
}
