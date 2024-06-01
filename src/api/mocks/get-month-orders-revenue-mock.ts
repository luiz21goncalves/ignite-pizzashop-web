import { http, HttpResponse } from 'msw'

import { GetMonthOrdersRevenueResponse } from '../get-month-orders-revenue'

export const getMonthOrdersRevenueMock = http.get<
  never,
  never,
  GetMonthOrdersRevenueResponse
>('/metrics/month-revenue', async () => {
  return HttpResponse.json({ revenue: 2000000, diffFromLastMonth: 10 })
})
