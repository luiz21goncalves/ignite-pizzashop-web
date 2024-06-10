import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { getOrderDetails } from '@/api/get-order-details'
import { OrderStatus } from '@/components/order-status'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatRelativeDate } from '@/lib/date'
import { formatCentsInMonetary } from '@/lib/monetary'

import { OrderDetailsSkeleton } from './order-details-skeleton'

type OrderDetailsProps = {
  orderId: string
  open: boolean
}

export function OrderDetails({ orderId, open }: OrderDetailsProps) {
  const [t] = useTranslation('translations', {
    keyPrefix: 'pages.orders.components.details',
  })
  const { data: order } = useQuery({
    queryKey: ['order', orderId],
    enabled: open,
    queryFn: () => getOrderDetails({ orderId }),
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t('title', { orderId })}</DialogTitle>
        <DialogDescription>{t('description')}</DialogDescription>
      </DialogHeader>

      {order ? (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  {t('order.table.rows.0')}
                </TableCell>
                <TableCell className="flex justify-end">
                  <OrderStatus status={order.status} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  {t('order.table.rows.1')}
                </TableCell>
                <TableCell className="flex justify-end">
                  {order.customer.name}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  {t('order.table.rows.2')}
                </TableCell>
                <TableCell className="flex justify-end">
                  {order.customer.phone ?? 'Não informado'}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  {t('order.table.rows.3')}
                </TableCell>
                <TableCell className="flex justify-end">
                  {order.customer.email}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  {t('order.table.rows.4')}
                </TableCell>
                <TableCell className="flex justify-end">
                  {formatRelativeDate(order.createdAt)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('product.table.header.rows.0')}</TableHead>
                <TableHead className="text-right">
                  {t('product.table.header.rows.1')}
                </TableHead>
                <TableHead className="text-right">
                  {t('product.table.header.rows.2')}
                </TableHead>
                <TableHead className="text-right">
                  {t('product.table.header.rows.3')}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {order.orderItems.map((orderItem) => {
                return (
                  <TableRow key={orderItem.id}>
                    <TableCell>{orderItem.product.name}</TableCell>
                    <TableCell className="text-right">
                      {orderItem.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCentsInMonetary(orderItem.priceInCents)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCentsInMonetary(
                        orderItem.priceInCents * orderItem.quantity,
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>{t('product.table.footer.0')}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatCentsInMonetary(order.totalInCents)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      ) : (
        <OrderDetailsSkeleton />
      )}
    </DialogContent>
  )
}
