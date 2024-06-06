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
    storeProfileDialog: {
      feedback: {
        toast: {
          success: 'Profile updated successfully!',
          error: 'Failed to update your profile, please try again!',
        },
      },
      form: {
        buttons: {
          cancel: 'Cancel',
          confirm: 'Save',
        },
        inputs: {
          name: 'Name',
          description: 'Description',
        },
      },
      dialog: {
        title: 'Store Profile',
        description:
          "Update your establishment's information to be visible to your customer",
      },
    },
  },
} satisfies CustomTypeOptions['resources']
