import { CustomTypeOptions } from 'i18next'

export const en = {
  translations: {
    header: {
      navigation: {
        '/': 'Dashboard',
        '/orders': 'Orders',
      },
    },
    accountMenu: {
      buttons: {
        logout: 'Logout',
        profile: 'Store profile',
      },
    },
  },
} satisfies CustomTypeOptions['resources']
