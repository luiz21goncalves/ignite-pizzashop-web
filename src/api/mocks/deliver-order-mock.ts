import { http, HttpResponse } from 'msw'

import { DeliverOrderParam } from '../deliver-order'

export const deliverOrderMock = http.patch<DeliverOrderParam>(
  '/orders/:orderId/deliver',
  ({ params }) => {
    const { orderId } = params

    if (orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  },
)
