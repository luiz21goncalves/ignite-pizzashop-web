import { http, HttpResponse } from 'msw'

import { GetPopularProducts } from '../get-popular-products'

export const getPopularProdutsMock = http.get<never, never, GetPopularProducts>(
  '/metrics/popular-products',
  () => {
    return HttpResponse.json([
      { amount: 50, product: 'Pizza 01' },
      { amount: 70, product: 'Pizza 02' },
      { amount: 123, product: 'Pizza 03' },
      { amount: 20, product: 'Pizza 04' },
      { amount: 40, product: 'Pizza 05' },
    ])
  },
)
