import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import i18n from '@/i18n'

import { Pagination } from './pagination'

const mockedOnPageChange = vi.fn()

describe('Pagination', () => {
  beforeEach(() => {
    mockedOnPageChange.mockClear()
  })

  it('should display the right amount of pages and results', () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={mockedOnPageChange}
      />,
      {
        wrapper({ children }) {
          return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        },
      },
    )

    expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument()
    expect(wrapper.getByText('Total de 200 item(s)')).toBeInTheDocument()
  })

  it('should be able to native to the next page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={mockedOnPageChange}
      />,
      {
        wrapper({ children }) {
          return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        },
      },
    )

    const user = userEvent.setup()

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Próxima página',
    })

    await user.click(nextPageButton)

    expect(mockedOnPageChange).toHaveBeenNthCalledWith(1, 1)
  })

  it('should be able to native to the previous page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={mockedOnPageChange}
      />,
      {
        wrapper({ children }) {
          return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        },
      },
    )

    const user = userEvent.setup()

    const previousPageButton = wrapper.getByRole('button', {
      name: 'Página anterior',
    })

    await user.click(previousPageButton)

    expect(mockedOnPageChange).toHaveBeenNthCalledWith(1, 4)
  })

  it('should be able to native to the first page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={mockedOnPageChange}
      />,
      {
        wrapper({ children }) {
          return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        },
      },
    )

    const user = userEvent.setup()

    const firstPageButton = wrapper.getByRole('button', {
      name: 'Primeira página',
    })

    await user.click(firstPageButton)

    expect(mockedOnPageChange).toHaveBeenNthCalledWith(1, 0)
  })

  it('should be able to native to the last page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={mockedOnPageChange}
      />,
      {
        wrapper({ children }) {
          return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        },
      },
    )

    const user = userEvent.setup()

    const lastPageButton = wrapper.getByRole('button', {
      name: 'Última página',
    })

    await user.click(lastPageButton)

    expect(mockedOnPageChange).toHaveBeenNthCalledWith(1, 19)
  })
})
