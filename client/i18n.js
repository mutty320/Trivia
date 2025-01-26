import 'intl-pluralrules'; 
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'; // For React integration

i18n.use(initReactI18next).init({
  resources: {
    en: {                                
      translation: require('./locales/en/translation.json'), // English translations
    },
    he: {
      translation: require('./locales/he/translation.json'), // Hebrew translations
    },
  },
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language if the current language is not available
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
