import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'pt_BR',
  fallbackLng: 'pt_BR',

  ns: ['axios', 'auth', 'common', 'drawer', 'password-reset'],

  resources: {
    pt_BR: {
      axios: require('./locales/pt-BR/axios.json'),
      auth: require('./locales/pt-BR/auth.json'),
      common: require('./locales/pt-BR/common.json'),
      drawer: require('./locales/pt-BR/drawer.json'),
      'password-reset': require('./locales/pt-BR/password-reset.json'),
    },
  },

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
