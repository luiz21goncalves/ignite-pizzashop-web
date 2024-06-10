import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import i18n from '@/i18n'
import { queryClient } from '@/lib/react-query'

import { SignIn } from './sign-in'

describe('SignIn', () => {
  it('should set default email input value if the email is present on search params', () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          <I18nextProvider i18n={i18n}>
            <HelmetProvider>
              <MemoryRouter
                initialEntries={['/sign-in?email=john.doe@email.com']}
              >
                <QueryClientProvider client={queryClient}>
                  {children}
                </QueryClientProvider>
              </MemoryRouter>
            </HelmetProvider>
          </I18nextProvider>
        )
      },
    })

    const emailInput = wrapper.getByRole('textbox', {
      name: 'Your email',
    }) as HTMLInputElement

    expect(emailInput.value).toEqual('john.doe@email.com')
  })
})
