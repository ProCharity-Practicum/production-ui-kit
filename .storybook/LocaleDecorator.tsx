// Wrap your stories in the I18nextProvider component
import type { Decorator } from '@storybook/react';
import { Suspense, useEffect } from 'react';
import i18n from '@/i18n.ts';
import { I18nextProvider } from 'react-i18next';

export const LocaleDecorator: Decorator = (Story, context) => {
	const { locale } = context.globals;

	// When the locale global changes
	// Set the new locale in i18n
	useEffect(() => {
		void i18n.changeLanguage(locale);
	}, [locale]);

	return (
		// This catches the suspense from components not yet ready (still loading translations)
		// Alternative: set useSuspense to false on i18next.options.react when initializing i18next
		<Suspense fallback={<div>loading translations...</div>}>
			<I18nextProvider i18n={i18n}>
				<Story />
			</I18nextProvider>
		</Suspense>
	);
};