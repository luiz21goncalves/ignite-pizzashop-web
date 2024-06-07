import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { getDayOrdersAmount } from '@/api/get-day-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function DayOrdersAmountCard() {
  const [t] = useTranslation('translations', {
    keyPrefix: 'pages.dashboard.components.cards.day-orders-amount',
  })
  const { data: dayOrdersAmount } = useQuery({
    queryFn: getDayOrdersAmount,
    queryKey: ['metrics', 'day-orders-amount'],
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">{t('title')}</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {dayOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>

            <p className="text-xs text-muted-foreground">
              {dayOrdersAmount.diffFromYesterday >= 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{dayOrdersAmount.diffFromYesterday}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  {dayOrdersAmount.diffFromYesterday}%
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
