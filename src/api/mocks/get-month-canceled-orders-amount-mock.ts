import { http, HttpResponse } from 'msw'

import { GetCanceledMonthOrdersAmountResponse } from '../get-canceled-month-orders-amount'

export const getCanceledMonthOrdersAmountMock = http.get<
  never,
  never,
  GetCanceledMonthOrdersAmountResponse
>('/metrics/month-canceled-orders-amount', async () => {
  return HttpResponse.json({ amount: 5, diffFromLastMonth: -15 })
})
