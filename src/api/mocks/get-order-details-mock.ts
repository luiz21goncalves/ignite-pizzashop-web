import { http, HttpResponse } from 'msw'

import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '../get-order-details'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      email: 'john.doe@email.com',
      name: 'John Doe',
      phone: null,
    },
    createdAt: new Date().toISOString(),
    status: 'processing',
    totalInCents: 74000,
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 10000,
        product: { name: 'Pizza 001' },
        quantity: 1,
      },
      {
        id: 'order-item-2',
        priceInCents: 12000,
        product: { name: 'Pizza 002' },
        quantity: 3,
      },
      {
        id: 'order-item-3',
        priceInCents: 14000,
        product: { name: 'Pizza 003' },
        quantity: 2,
      },
    ],
  })
})
