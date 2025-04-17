import clsx from 'clsx';
import styles from './Layout.module.scss';
import {
	Header,
	HeaderProps,
} from '@/components/Common/Layout/Header/Header.tsx';
import { FunctionComponent, ReactNode } from 'react';
import {
	Footer,
	FooterProps,
} from '@/components/Common/Layout/Footer/Footer.tsx';

export type LayoutProps = {
	className?: string;
	children?: ReactNode;
	user?: ReactNode;
	headerSettings: HeaderProps;
	footerSettings: FooterProps;
};

type SectionProps = {
	className?: string;
	children: ReactNode;
	pt?: {
		content?: string;
	};
};

function Section({ children, className, pt }: SectionProps) {
	const { content } = pt || {};
	return (
		<section className={clsx(styles.section, className)} data-testid="Section">
			<div className={clsx(styles.container, content)}>{children}</div>
		</section>
	);
}

export interface LayoutSubcomponents {
	Section: typeof Section;
}

export const Layout: FunctionComponent<LayoutProps> & LayoutSubcomponents = ({
	className,
	children,
	user,
	headerSettings,
	footerSettings,
}: LayoutProps) => {
	return (
		<div className={clsx(styles.layout, className)} data-testid="Layout">
			<Header {...headerSettings}>{user}</Header>
			<div className={styles.content}>{children}</div>
			<Footer {...footerSettings} />
		</div>
	);
};

Layout.Section = Section;
