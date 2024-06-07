import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { getMonthOrdersRevenue } from '@/api/get-month-orders-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCentsInMonetary } from '@/lib/monetary'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthRevenueCard() {
  const [t] = useTranslation('translations', {
    keyPrefix: 'pages.dashboard.components.cards.month-revenue',
  })
  const { data: monthRevenue } = useQuery({
    queryFn: getMonthOrdersRevenue,
    queryKey: ['metrics', 'month-revenue'],
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">{t('title')}</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenue ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {formatCentsInMonetary(monthRevenue.revenue)}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthRevenue.diffFromLastMonth >= 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{monthRevenue.diffFromLastMonth}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  {monthRevenue.diffFromLastMonth}%
                </span>
              )}{' '}
              {t('label')}
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
