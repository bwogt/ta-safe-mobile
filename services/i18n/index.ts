import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'pt_BR',
  fallbackLng: 'pt_BR',

  ns: [
    'axios',
    'login',
    'register-user',
    'password-reset-start',
    'password-reset-check',
    'password-reset',
  ],

  defaultNS: 'login',

  resources: {
    pt_BR: {
      axios: require('./locales/pt-BR/axios.json'),
      login: require('./locales/pt-BR/login.json'),
      'register-user': require('./locales/pt-BR/register-user.json'),
      'password-reset-start': require('./locales/pt-BR/password-reset-start.json'),
      'password-reset-check': require('./locales/pt-BR/password-reset-check.json'),
      'password-reset': require('./locales/pt-BR/password-reset.json'),
    },
  },

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
