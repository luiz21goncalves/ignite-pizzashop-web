import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFilterData = z.infer<typeof orderFiltersSchema>

export function OrderTableFilters() {
  const [t] = useTranslation('translations', {
    keyPrefix: 'pages.orders.components.filter',
  })
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { register, handleSubmit, control, reset } = useForm<OrderFilterData>({
    resolver: zodResolver(orderFiltersSchema),
    values: {
      orderId: orderId ?? '',
      customerName: customerName ?? '',
      status: status ?? 'all',
    },
  })

  function handleFilter(data: OrderFilterData) {
    setSearchParams((params) => {
      Object.entries(data).forEach(([key, value]) => {
        if (value === '') {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      })

      params.set('page', '1')

      return params
    })
  }

  function handleClearFilters() {
    setSearchParams((params) => {
      params.delete('orderId')
      params.delete('customerName')
      params.delete('status')
      params.set('page', '1')

      return params
    })

    reset({
      customerName: '',
      orderId: '',
      status: '',
    })
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilter)}
      onReset={handleClearFilters}
    >
      <span className="text-sm font-semibold">{t('label')}</span>

      <Input
        placeholder={t('inputs.id')}
        className="h-8 w-auto"
        {...register('orderId')}
      />

      <Input
        placeholder={t('inputs.name')}
        className="h-8 w-[320px]"
        {...register('customerName')}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t('inputs.status.options.all')}
                </SelectItem>
                <SelectItem value="pending">
                  {t('inputs.status.options.pending')}
                </SelectItem>
                <SelectItem value="canceled">
                  {t('inputs.status.options.canceled')}
                </SelectItem>
                <SelectItem value="processing">
                  {t('inputs.status.options.processing')}
                </SelectItem>
                <SelectItem value="delivering">
                  {t('inputs.status.options.delivering')}
                </SelectItem>
                <SelectItem value="delivered">
                  {t('inputs.status.options.delivered')}
                </SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        {t('buttons.confirm')}
      </Button>

      <Button type="reset" variant="outline" size="xs">
        <X className="mr-2 h-4 w-4" />
        {t('buttons.cancel')}
      </Button>
    </form>
  )
}
