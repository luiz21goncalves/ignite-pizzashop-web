import { api } from '@/lib/axios'

export type GetMonthOrdersRevenueResponse = {
  revenue: number
  diffFromLastMonth: number
}

export async function getMonthOrdersRevenue() {
  const response = await api.get<GetMonthOrdersRevenueResponse>(
    '/metrics/month-revenue',
  )

  return response.data
}
