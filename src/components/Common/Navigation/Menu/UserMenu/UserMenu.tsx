import { useState } from 'react';
import styles from './UserMenu.module.scss';
import { Menu, MenuItem } from '../Menu';
import clsx from 'clsx';

export type UserMenuProps = {
	items: MenuItem[];
	title: string;
	className?: string;
};

export function UserMenu({ items, title, className }: UserMenuProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className={clsx(styles.userMenu, className)} data-testid="UserMenu">
			<button
				className={clsx(styles.userButton, className)}
				onClick={toggleMenu}
			>
				{title}
			</button>
			{isOpen && (
				<div className={clsx(styles.dropdown, className)}>
					<Menu items={items} />
				</div>
			)}
		</div>
	);
}
