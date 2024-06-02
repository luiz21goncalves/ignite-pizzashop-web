import { http, HttpResponse } from 'msw'

import { GetOrdersResponse, OrderStatusType } from '../get-orders'

const statuses: OrderStatusType[] = [
  'pending',
  'canceled',
  'delivered',
  'delivering',
  'processing',
]

const orders: GetOrdersResponse['orders'] = Array.from({ length: 60 }).map(
  (_, index) => {
    const id = index + 1

    return {
      orderId: `order-${id}`,
      customerName: `Customer ${id}`,
      createdAt: new Date().toISOString(),
      totalInCents: 2400,
      status: statuses[index % statuses.length],
    }
  },
)

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  '/orders',
  async ({ request }) => {
    const { searchParams } = new URL(request.url)

    const pageIndex = searchParams.get('pageIndex')
      ? Number(searchParams.get('pageIndex'))
      : 0
    const orderId = searchParams.get('orderId')
    const customerName = searchParams.get('customerName')
    const status = searchParams.get('status')

    let filteredOrders = orders

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerName),
      )
    }

    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.includes(orderId),
      )
    }

    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    )

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    })
  },
)
