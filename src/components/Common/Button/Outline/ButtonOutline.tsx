import clsx from 'clsx';
import buttonStyles from '../Button.module.scss';
import styles from './ButtonOutline.module.scss';
import { ReactNode } from 'react';

import { IconNames } from '@/components/Core/Icon/types';
import { Icon } from '@/components/Core/Icon/Icon.tsx';
import { ButtonTag } from '@/components/Common/Button';
import { Anchor } from '@/components/Core/Anchor/Anchor.tsx';

export type ButtonOutlineProps = {
	icon?: ReactNode | IconNames;
	counter?: number;
	children?: ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
	href?: string;
	Tag?: ButtonTag;
};

// @todo: dynamic sizing
export function ButtonOutline({
	icon,
	counter,
	children,
	onClick,
	disabled = false,
	className,
	href,
	Tag = 'button',
}: ButtonOutlineProps) {
	if (disabled) return null;

	const isIconOnly = icon && !counter && !children;
	const iconElement =
		typeof icon === 'string' ? <Icon name={icon as IconNames} /> : icon;

	const commonProps = {
		className: clsx(
			styles.outlineButton,
			{ [styles.iconOnly]: isIconOnly },
			buttonStyles.outline,
			className
		),
		onClick,
		disabled,
		children: (
			<>
				{children && <span className={styles.text}>{children}</span>}
				{icon && <span className={styles.icon}>{iconElement}</span>}
				{!!counter && <span className={styles.counter}>{counter}</span>}
			</>
		),
		'data-testid': 'ButtonOutline',
	};

	return Tag === 'a' ? (
		<Anchor {...commonProps} href={href} />
	) : (
		<Tag {...commonProps} />
	);
}
