import { http, HttpResponse } from 'msw'

import { CancelOrderParam } from '../cancel-order'

export const cancelOrderMock = http.patch<CancelOrderParam>(
  '/orders/:orderId/cancel',
  ({ params }) => {
    const { orderId } = params

    if (orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  },
)
