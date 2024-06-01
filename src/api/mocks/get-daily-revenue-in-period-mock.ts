import { http, HttpResponse } from 'msw'

import { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>('/metrics/daily-revenue-in-period', () => {
  return HttpResponse.json([
    { date: '2024-04-01', revenue: 300000 },
    { date: '2024-04-02', revenue: 250000 },
    { date: '2024-04-03', revenue: 500000 },
    { date: '2024-04-04', revenue: 150000 },
    { date: '2024-04-06', revenue: 300000 },
    { date: '2024-04-07', revenue: 450000 },
    { date: '2024-04-08', revenue: 360000 },
  ])
})
