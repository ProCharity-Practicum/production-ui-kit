import translation from '@public/locales/ru/translation.json';

export const defaultNS = 'translation';
export const resources = {
	ru: {
		translation,
	},
} as const;

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS;
		resources: (typeof resources)['ru'];
	}
}
