import { api } from '@/lib/axios'

type GetDailyRevenueInPeriodResponse = Array<{
  date: string
  revenue: number
}>
type GetDailyRevenueInPeriodQuery = {
  to?: Date
  from?: Date
}

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodQuery) {
  const response = await api.get<GetDailyRevenueInPeriodResponse>(
    '/metrics/daily-revenue-in-period',
    { params: { to, from } },
  )

  return response.data
}
