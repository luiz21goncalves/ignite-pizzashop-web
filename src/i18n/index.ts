import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { ptBr } from '../i18n/locales/pt-BR'
import { en } from './locales/en'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    defaultNS: 'translations',
    ns: ['translations'],
    resources: {
      'pt-BR': ptBr,
      en,
    },
    fallbackLng: 'pt-BR',
  })

export default i18n
