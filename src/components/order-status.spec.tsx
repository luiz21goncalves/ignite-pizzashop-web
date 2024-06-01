import { render } from '@testing-library/react'
import colors from 'tailwindcss/colors'
import { describe, expect, it } from 'vitest'

import { OrderStatus } from './order-status'

describe('OrderStatus', () => {
  it.each([
    {
      status: 'pending',
      expectedColor: colors.slate[400],
      expectedText: 'Pendente',
    },
    {
      status: 'canceled',
      expectedColor: colors.rose[400],
      expectedText: 'Cancelado',
    },
    {
      status: 'delivered',
      expectedColor: colors.emerald[500],
      expectedText: 'Entregue',
    },
    {
      status: 'delivering',
      expectedColor: colors.amber[500],
      expectedText: 'Em entrega',
    },
    {
      status: 'processing',
      expectedColor: colors.amber[500],
      expectedText: 'Em preparo',
    },
  ] as const)(
    'should display the right text when status is $status',
    ({ expectedColor, expectedText, status }) => {
      const wrapper = render(<OrderStatus status={status} />)

      const statusText = wrapper.getByText(expectedText)
      const badgeElement = wrapper.getByTestId('badge')

      expect(statusText).toBeInTheDocument()
      expect(badgeElement).toHaveStyle({
        'background-color': expectedColor,
      })
    },
  )
})
