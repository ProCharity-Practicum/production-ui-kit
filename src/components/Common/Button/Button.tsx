import clsx from 'clsx';
import styles from './Button.module.scss';
import { Icon } from '@/components/Core/Icon/Icon';
import {
	ButtonTag,
	ButtonType,
	ButtonVariant,
} from '@/components/Common/Button/types';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { Anchor } from '@/components/Core/Anchor/Anchor.tsx';

export type ButtonProps = {
	type?: ButtonType | keyof typeof ButtonType;
	variant?: ButtonVariant | keyof typeof ButtonVariant;
	disabled?: boolean;
	waiting?: boolean;
	onClick?: () => void;
	className?: string;
	children?: ReactNode;
	href?: string;
	Tag?: ButtonTag;
	name?: string
} & DetailedHTMLProps<
	HTMLAttributes<HTMLAnchorElement | HTMLButtonElement>,
	HTMLAnchorElement | HTMLButtonElement
>;

type ButtonElement = DetailedHTMLProps<
	HTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;
type AnchorElement = DetailedHTMLProps<
	HTMLAttributes<HTMLAnchorElement>,
	HTMLAnchorElement
>;

export function Button({
	type = ButtonType.button,
	variant = ButtonVariant.primary,
	disabled = false,
	waiting = false,
	onClick,
	className,
	children,
	href,
	Tag = 'button',
	...props
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
	};

	return Tag === 'a' ? (
		<Anchor
			data-testid="Button"
			{...(props as AnchorElement)}
			{...commonProps}
			href={href}
		/>
	) : (
		<Tag
			data-testid="Button"
			{...(props as ButtonElement)}
			{...commonProps}
			type={type}
		/>
	);
}
