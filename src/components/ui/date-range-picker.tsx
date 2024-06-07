import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { DateRange } from 'react-day-picker'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type DateRangePickerProps = React.ComponentProps<'div'> & {
  date?: DateRange
  onDateChange: (data: DateRange | undefined) => void
}

export function DateRangePicker({
  className,
  date,
  onDateChange,
}: DateRangePickerProps) {
  const [, i18n] = useTranslation()

  const locale = i18n.language === 'pt-BR' ? ptBR : undefined

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y', { locale })} -{' '}
                  {format(date.to, 'LLL dd, y', { locale })}
                </>
              ) : (
                format(date.from, 'LLL dd, y', { locale })
              )
            ) : (
              <span>Selecione uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateChange}
            numberOfMonths={1}
            locale={locale}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
