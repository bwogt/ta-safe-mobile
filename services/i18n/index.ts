import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'pt-BR',
  fallbackLng: 'pt-BR',

  ns: ['auth', 'common', 'dashboard', 'device', 'errors', 'profile'],

  resources: {
    'pt-BR': {
      auth: require('./locales/pt-BR/auth.json'),
      common: require('./locales/pt-BR/common.json'),
      dashboard: require('./locales/pt-BR/dashboard.json'),
      device: require('./locales/pt-BR/device.json'),
      errors: require('./locales/pt-BR/errors.json'),
      profile: require('./locales/pt-BR/profile.json'),
    },
  },

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
