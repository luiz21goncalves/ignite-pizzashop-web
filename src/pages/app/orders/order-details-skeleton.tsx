import { useTranslation } from 'react-i18next'

import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function OrderDetailsSkeleton() {
  const [t] = useTranslation('translations', {
    keyPrefix: 'pages.orders.components.details',
  })
  return (
    <div className="space-y-6">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">
              {' '}
              {t('order.table.rows.0')}
            </TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-20" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">
              {t('order.table.rows.1')}
            </TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[164px]" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">
              {t('order.table.rows.2')}
            </TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[140px]" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">
              {t('order.table.rows.3')}
            </TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[200px]" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">
              {t('order.table.rows.4')}
            </TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[148px]" />
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
          {Array.from({ length: 2 }).map((_, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-5 w-[140px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="ml-auto h-5 w-3" />
                </TableCell>
                <TableCell>
                  <Skeleton className="ml-auto h-5 w-12" />
                </TableCell>
                <TableCell>
                  <Skeleton className="ml-auto h-5 w-12" />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>{t('product.table.footer.0')}</TableCell>
            <TableCell className="text-right font-medium">
              <Skeleton className="h-5 w-20" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
