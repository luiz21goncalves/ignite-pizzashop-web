import { http, HttpResponse } from 'msw'

import { GetManagedRestaurantResponse } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', () => {
  return HttpResponse.json({
    id: '1',
    createdAt: new Date().toISOString(),
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam ipsam minus maiores voluptatem dolor voluptatibus laudantium eveniet magnam exercitationem nam officia recusandae suscipit corrupti aliquid blanditiis placeat, veritatis quis illum.',
    managerId: '1',
    name: 'Pizza Shop',
    updatedAt: new Date().toISOString(),
  })
})
