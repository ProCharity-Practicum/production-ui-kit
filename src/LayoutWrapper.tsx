import { AnchorProvider } from '@/components/Core/Anchor/AnchorProvider.tsx';
import { Link, Outlet } from 'react-router';
import { Layout } from '@/components/Common/Layout/Layout.tsx';
import { FOOTER_PROPS, MENU_PROPS } from '@/settings.tsx';
import { Header } from '@/components/Common/Layout/Header/Header.tsx';

export function LayoutWrapper() {
	return (
		<AnchorProvider
			LinkElement={({ href, ...props }) => {
				return <Link {...props} to={href as string} />;
			}}
		>
			<Layout
				headerSettings={MENU_PROPS}
				footerSettings={FOOTER_PROPS}
				user={
					<Header.GuestUser
						signUpLink={'/registration'}
						signInLink={() => console.log('sign-in')}
					/>
				}
			>
				<Outlet />
			</Layout>
		</AnchorProvider>
	);
}
