import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'pt-BR',
  fallbackLng: 'pt-BR',

  ns: ['auth', 'common', 'dashboard', 'drawer', 'errors', 'password-reset'],

  resources: {
    'pt-BR': {
      auth: require('./locales/pt-BR/auth.json'),
      common: require('./locales/pt-BR/common.json'),
      dashboard: require('./locales/pt-BR/dashboard.json'),
      drawer: require('./locales/pt-BR/drawer.json'),
      errors: require('./locales/pt-BR/errors.json'),
      'password-reset': require('./locales/pt-BR/password-reset.json'),
    },
  },

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
