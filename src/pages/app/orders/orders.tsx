import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getOrders } from '@/api/get-orders'
import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderTableFilters } from './order-table-filters'
import { OrderTableRow } from './order-table-row'
import { OrderTableSkelton } from './order-table-skeleton'

export function Orders() {
  const [t] = useTranslation('translations', { keyPrefix: 'pages.orders' })
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')
  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { data: ordersResponse, isLoading: isLoadingOrders } = useQuery({
    queryFn: () =>
      getOrders({
        pageIndex,
        orderId,
        customerName,
        status: status === 'all' ? null : status,
      }),
    queryKey: ['orders', { pageIndex, orderId, customerName, status }],
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((params) => {
      const page = pageIndex + 1
      params.set('page', page.toString())

      return params
    })
  }

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{t('heading')}</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]" />
                  <TableHead className="w-[140px]">
                    {t('components.table.header.rows.2')}
                  </TableHead>
                  <TableHead className="w-[180px]">
                    {t('components.table.header.rows.3')}
                  </TableHead>
                  <TableHead className="w-[140px]">
                    {t('components.table.header.rows.4')}
                  </TableHead>
                  <TableHead>{t('components.table.header.rows.5')}</TableHead>
                  <TableHead className="w-[140px]">
                    {t('components.table.header.rows.6')}
                  </TableHead>
                  <TableHead className="w-[164px]" />
                  <TableHead className="w-[132px]" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoadingOrders && <OrderTableSkelton />}
                {ordersResponse?.orders.map((order) => {
                  return <OrderTableRow key={order.orderId} order={order} />
                })}
              </TableBody>
            </Table>
          </div>

          {ordersResponse && (
            <Pagination
              pageIndex={pageIndex}
              totalCount={ordersResponse.meta.totalCount}
              perPage={ordersResponse.meta.perPage}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      </div>
    </>
  )
}
