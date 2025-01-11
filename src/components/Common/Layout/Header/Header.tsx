import clsx from 'clsx';
import { throttle } from 'lodash';

import { Icon } from '@/components/Core/Icon';
import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { GuestUser } from '@/components/Common/Layout/Header/GuestUser/GuestUser';

import styles from './Header.module.scss';
import { Anchor } from '@/components/Core/Anchor/Anchor.tsx';

export type MenuLink = {
	label: string | ReactNode;
	href: string;
};

export type BaseHeaderProps = {
	className?: string;
	menu: MenuLink[];
	children?: ReactNode;
};

export type HeaderProps = BaseHeaderProps & {
	isSticky?: boolean;
	isCollapsed?: boolean;
	autoCollapseThreshold?: number;
};

export type HeaderSubcomponents = {
	GuestUser: typeof GuestUser;
};

export const Header: FunctionComponent<HeaderProps> & HeaderSubcomponents = ({
	className,
	isCollapsed = false,
	isSticky = true,
	autoCollapseThreshold,
	menu,
	children,
}: HeaderProps) => {
	const [isAutoCollapsed, setIsAutoCollapsed] = useState(false);
	const [isMenuOpened, setMenuOpened] = useState(false);

	useEffect(() => {
		const throttledHandler = throttle(() => {
			if (!isAutoCollapsed && window.scrollY >= autoCollapseThreshold!) {
				setIsAutoCollapsed(true);
			}
			if (isAutoCollapsed && window.scrollY < autoCollapseThreshold!) {
				setIsAutoCollapsed(false);
			}
		}, 10);

		if (autoCollapseThreshold) {
			window.addEventListener('scroll', throttledHandler);
		}
		return () => window.removeEventListener('scroll', throttledHandler);
	}, [autoCollapseThreshold, isAutoCollapsed]);

	return (
		<header
			className={clsx(styles.header, className, {
				[styles.sticky]: isSticky,
				[styles.collapsed]: isCollapsed || isAutoCollapsed,
			})}
			data-testid="Header"
		>
			<div className={styles.container}>
				<button className={styles.trigger} onClick={() => setMenuOpened(true)}>
					<Icon name="menu" />
				</button>
				<Anchor href="/" className={styles.logo} />
				<nav
					className={clsx(styles.menu, {
						[styles.active]: isMenuOpened,
					})}
				>
					<button className={styles.close} onClick={() => setMenuOpened(false)}>
						<Icon name="close" />
					</button>
					<ul className={styles.menuContent}>
						{menu.map(({ label, href }, index) => (
							<li key={index} className={styles.link}>
								<Anchor href={href}>{label}</Anchor>
							</li>
						))}
					</ul>
				</nav>
				<nav className={styles.controls}>{children}</nav>
			</div>
		</header>
	);
};

Header.GuestUser = GuestUser;
