import type { Preview } from '@storybook/react';
import { LocaleDecorator } from './LocaleDecorator.tsx';
import "@/index.scss";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18nextPlugin } from 'translation-check';
import translation from '@public/locales/ru/translation.json';

void i18n
	.use(i18nextPlugin)
	.use(initReactI18next)
	.init({
		supportedLngs: ['en', 'ru'],
		fallbackLng: 'ru',
		ns: [],
		debug: true,
		interpolation: {
			escapeValue: false,
		},
		resources: {
			ru: {
				translation,
			},
		}
	});


const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		viewport: {
			viewports: {
				wide: {
					type: 'desktop',
					name: 'Wide Desktop',
					styles: { width: '1920', height: '1488' },
				},
				desktop: {
					type: 'desktop',
					name: 'Desktop',
					styles: { width: '1280px', height: '720px' },
				},
				tablet: {
					type: 'desktop',
					name: 'Tablet',
					styles: { width: '768px', height: '1024px' },
				},
				mobile: {
					type: 'desktop',
					name: 'Small Mobile',
					styles: { width: '320px', height: '568px' },
				},
			},
		},
	},
	decorators: [LocaleDecorator],
	globalTypes: {
		locale: {
			name: 'Locale',
			description: 'Internationalization locale',
			toolbar: {
				icon: 'globe',
				items: [
					{ value: 'en', title: 'English' },
					{ value: 'ru', title: 'Russian' },
				],
				showName: true,
			},
		},
	},
};

i18n.on('languageChanged', (locale) => {
	document.dir = i18n.dir(locale);
});

export default preview;
