import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      id: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      role: 'manager',
      email: 'john.doe@email.com',
      name: 'John Doe',
      phone: null,
    })
  },
)
