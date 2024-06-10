import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { GetOrdersResponse, OrderStatusType } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatRelativeDate } from '@/lib/date'
import { formatCentsInMonetary } from '@/lib/monetary'

import { OrderDetails } from './order-details'

type OrderTableRowProps = {
  order: {
    orderId: string
    createdAt: string
    status: OrderStatusType
    totalInCents: number
    customerName: string
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [t] = useTranslation('translations', {
    keyPrefix: 'pages.orders.components.table.body',
  })
  const [isDetailsOpen, setDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache({
    orderId,
    status,
  }: {
    orderId: string
    status: OrderStatusType
  }) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (cacheData) {
        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map((order) => {
            if (order.orderId === orderId) {
              return { ...order, status }
            }

            return order
          }),
        })
      }
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess(_data, { orderId }) {
        updateOrderStatusOnCache({ orderId, status: 'canceled' })
      },
    })
  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess(_data, { orderId }) {
        updateOrderStatusOnCache({ orderId, status: 'processing' })
      },
    })
  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess(_data, { orderId }) {
        updateOrderStatusOnCache({ orderId, status: 'delivering' })
      },
    })
  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess(_data, { orderId }) {
        updateOrderStatusOnCache({ orderId, status: 'delivered' })
      },
    })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">{t('rows.1')}</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>

      <TableCell className="font-xs font-mono font-medium">
        {order.orderId}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {formatRelativeDate(order.createdAt)}
      </TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">
        {formatCentsInMonetary(order.totalInCents)}
      </TableCell>

      <TableCell>
        {order.status === 'pending' && (
          <Button
            disabled={isApprovingOrder}
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            {t('rows.7.pending')}
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            disabled={isDispatchingOrder}
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            {t('rows.7.processing')}
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            disabled={isDeliveringOrder}
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            {t('rows.7.delivering')}
          </Button>
        )}
      </TableCell>

      <TableCell>
        <Button
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            isCancelingOrder
          }
          variant="ghost"
          size="xs"
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          {t('rows.8')}
        </Button>
      </TableCell>
    </TableRow>
  )
}
