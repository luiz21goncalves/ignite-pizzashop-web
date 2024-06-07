import { CustomTypeOptions } from 'i18next'

export const en = {
  translations: {
    header: {
      navigation: {
        '/': 'Home',
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
    layouts: {
      auth: {
        footer: 'Partner Dashboard © pizza.shop {{year}}',
      },
    },
    pages: {
      'sign-in': {
        heading: 'Access dashboard',
        description: 'Track your sales through the partner panel!',
        form: {
          input: 'Your email',
          button: 'Access dashboard',
        },
        'sign-up-link': 'New establishment',
        feedback: {
          toast: {
            error: 'Unable to send authentication email.',
            success: 'We send an authentication link to your email.',
          },
        },
      },
    },
  },
} satisfies CustomTypeOptions['resources']
