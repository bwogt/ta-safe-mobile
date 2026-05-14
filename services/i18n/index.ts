import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'pt_BR',
  fallbackLng: 'pt_BR',

  ns: ['auth'],
  defaultNS: 'auth',

  resources: {
    pt_BR: {
      auth: require('./locales/pt-BR/auth.json'),
    },
  },

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
