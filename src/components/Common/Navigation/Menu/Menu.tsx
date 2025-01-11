import styles from './Menu.module.scss';
import clsx from 'clsx';
import { Anchor } from '@/components/Core/Anchor/Anchor.tsx';

export type MenuItem = {
	label: string;
	href: string;
};

export type MenuProps = {
	items: MenuItem[];
	className?: string;
};

export function Menu({ items, className }: MenuProps) {
	return (
		<ul className={clsx(styles.menu, className)} data-testid="Menu">
			{items.map((item, index) => (
				<li key={index} className={clsx(styles.menuItem, className)}>
					<Anchor href={item.href} className={clsx(styles.menuLink, className)}>
						{item.label}
					</Anchor>
				</li>
			))}
		</ul>
	);
}
