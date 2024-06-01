import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

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
            <MemoryRouter initialEntries={['/about']}>{children}</MemoryRouter>
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
