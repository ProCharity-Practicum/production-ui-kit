import translation from '@public/locales/en/translation.json';

export const defaultNS = 'translation';
export const resources = {
	en: {
		translation,
	},
} as const;

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS;
		resources: (typeof resources)['en'];
	}
}
