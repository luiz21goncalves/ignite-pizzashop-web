import { http, HttpResponse } from 'msw'

import { DispatchOrderParam } from '../dispatch-order'

export const dispatchOrderMock = http.patch<DispatchOrderParam>(
  '/orders/:orderId/dispatch',
  ({ params }) => {
    const { orderId } = params

    if (orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  },
)
