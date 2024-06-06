import 'i18next'

import { ptBr } from '../i18n/locales/pt-BR'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translations'
    resources: typeof ptBr
  }
}
