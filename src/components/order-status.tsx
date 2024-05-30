import colors from 'tailwindcss/colors'

import { OrderStatusType } from '@/api/get-orders'

type OrderStatusProps = {
  status: OrderStatusType
}

const orderStatusMap: Record<
  OrderStatusType,
  { label: string; color: string }
> = {
  canceled: { label: 'Cancelado', color: colors.rose[400] },
  delivered: { label: 'Entregue', color: colors.emerald[500] },
  delivering: { label: 'Em entrega', color: colors.amber[500] },
  pending: { label: 'Pendente', color: colors.slate[400] },
  processing: { label: 'Em preparo', color: colors.amber[500] },
}

export function OrderStatus({ status }: OrderStatusProps) {
  const { color, label } = orderStatusMap[status]

  return (
    <div className="flex items-center gap-2">
      <span
        style={{ backgroundColor: color }}
        className={`h-2 w-2 rounded-full`}
      />
      <span className="font-medium text-muted-foreground">{label}</span>
    </div>
  )
}
