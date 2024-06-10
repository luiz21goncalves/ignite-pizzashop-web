import { render } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import i18n from '@/i18n'

import { NavLink } from './nav-link'

describe('NavLink', () => {
  it('should highlight the nav link when is the current page link', () => {
    const wrapper = render(
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <I18nextProvider i18n={i18n}>
              <MemoryRouter initialEntries={['/about']}>
                {children}
              </MemoryRouter>
            </I18nextProvider>
          )
        },
      },
    )

    expect(wrapper.getByRole('link', { name: 'Home' }).dataset.current).toEqual(
      'false',
    )
    expect(
      wrapper.getByRole('link', { name: 'About' }).dataset.current,
    ).toEqual('true')
  })
})
