import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { cancelOrder } from '@/api/cancel-order'
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
  const [isDetailsOpen, setDetailsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { mutateAsync: cancelOrderFn } = useMutation({
    mutationFn: cancelOrder,
    onSuccess(_data, { orderId }) {
      const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders'],
      })

      ordersListCache.forEach(([cacheKey, cacheData]) => {
        if (cacheData) {
          queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
            ...cacheData,
            orders: cacheData.orders.map((order) => {
              if (order.orderId === orderId) {
                return { ...order, status: 'canceled' }
              }

              return order
            }),
          })
        }
      })
    },
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
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
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button
          disabled={!['pending', 'processing'].includes(order.status)}
          variant="ghost"
          size="xs"
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
