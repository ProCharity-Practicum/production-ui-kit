import i18n from './i18n.ts';
import { I18nextProvider } from 'react-i18next';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router';
import { ReactElement } from 'react';
import { LayoutWrapper } from '@/LayoutWrapper.tsx';

export function withRouter(
	routes: RouteObject[],
	layout: ReactElement = <LayoutWrapper />
) {
	const router = createBrowserRouter([
		{
			element: layout,
			children: routes,
		},
	]);

	return function App() {
		return (
			<I18nextProvider i18n={i18n}>
				<RouterProvider router={router} />
			</I18nextProvider>
		);
	};
}
