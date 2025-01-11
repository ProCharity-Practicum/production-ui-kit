import clsx from 'clsx';
import styles from './Button.module.scss';
import { Icon } from '@/components/Core/Icon/Icon';
import {
	ButtonTag,
	ButtonType,
	ButtonVariant,
} from '@/components/Common/Button/types';
import { ReactNode } from 'react';
import { Anchor } from '@/components/Core/Anchor/Anchor.tsx';

export type ButtonProps = {
	type?: ButtonType;
	variant?: ButtonVariant;
	disabled?: boolean;
	waiting?: boolean;
	onClick?: () => void;
	className?: string;
	children?: ReactNode;
	href?: string;
	Tag?: ButtonTag;
};

export function Button({
	type = ButtonType.Button,
	variant = ButtonVariant.Primary,
	disabled = false,
	waiting = false,
	onClick,
	className,
	children,
	href,
	Tag = 'button',
}: ButtonProps) {
	const commonProps = {
		className: clsx(styles.button, styles[variant], className, {
			[styles.disabled]: disabled,
			[styles.waiting]: waiting,
		}),
		onClick,
		disabled,
		children: (
			<>
				{waiting && <Icon name="loader" />}
				{children}
			</>
		),
		'data-testid': 'Button',
	};

	return Tag === 'a' ? (
		<Anchor {...commonProps} href={href} />
	) : (
		<Tag type={type} {...commonProps} />
	);
}
