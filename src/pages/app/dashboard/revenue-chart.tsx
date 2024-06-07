import { useQuery } from '@tanstack/react-query'
import { format, subDays } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useTranslation } from 'react-i18next'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'
import { formatCentsInMonetary } from '@/lib/monetary'
export function RevenueChart() {
  const [t] = useTranslation('translations', {
    keyPrefix: 'pages.dashboard.components.charts',
  })
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })
  const { data: dayRevenueInPeriod } = useQuery({
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
    queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
  })

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            {t('revenue.title')}
          </CardTitle>
          <CardDescription>{t('revenue.description')}</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>{t('revenue.label')}</Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>

      <CardContent>
        {dayRevenueInPeriod ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={dayRevenueInPeriod} style={{ fontSize: 12 }}>
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                dy={16}
                tickFormatter={(value: string) =>
                  format(value, t('revenue.dateFormat'))
                }
              />
              <YAxis
                dataKey="revenue"
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) => formatCentsInMonetary(value)}
              />
              <CartesianGrid vertical={false} className="stroke-muted" />
              <Line
                type="linear"
                strokeWidth={2}
                dataKey="revenue"
                stroke={colors.violet[500]}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
