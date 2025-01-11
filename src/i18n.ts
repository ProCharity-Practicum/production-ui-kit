import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { i18nextPlugin } from 'translation-check';

void i18n
	.use(Backend) // lazy loads translations from /public/locales
	.use(LanguageDetector) // detect user language
	.use(i18nextPlugin)
	.use(initReactI18next)
	.init({
		supportedLngs: ['en', 'ru'],
		fallbackLng: 'en',
		ns: [],
		debug: true,
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
