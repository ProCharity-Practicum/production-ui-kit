import clsx from 'clsx';
import styles from './ButtonLink.module.scss';
import { ReactNode } from 'react';
import {
	ButtonLinkColor,
	ButtonLinkVariant,
	ButtonTag,
	IconPosition,
} from '@/components/Common/Button/types';

import { Icon } from '@/components/Core/Icon/Icon.tsx';
import { IconNames } from '@/components/Core/Icon';
import { Anchor } from '@/components/Core/Anchor/Anchor.tsx';

export type ButtonLinkProps = {
	className?: string;
	children?: ReactNode;
	icon?: ReactNode | IconNames;
	iconPosition?: IconPosition | keyof typeof IconPosition;
	disabled?: boolean;
	variant?: ButtonLinkVariant | keyof typeof ButtonLinkVariant;
	href?: string;
	onClick?: () => void;
	color?: ButtonLinkColor | keyof typeof ButtonLinkColor;
	Tag?: ButtonTag;
};

function withStyle(
	defaultVariant: ButtonLinkVariant,
	defaultColor: ButtonLinkColor,
	defaultIconPosition: IconPosition,
	defaultIcon?: ReactNode,
	defaultChildren?: ReactNode,
	defaultTag: ButtonTag = 'button'
) {
	return function ButtonLink({
		className,
		children = defaultChildren,
		icon = defaultIcon,
		iconPosition = defaultIconPosition,
		disabled = false,
		variant = defaultVariant,
		color = defaultColor,
		onClick,
		href,
		Tag = defaultTag,
	}: ButtonLinkProps) {
		if (disabled) return null;

		const iconElement =
			typeof icon === 'string' ? <Icon name={icon as IconNames} /> : icon;

		const commonProps = {
			className: clsx(styles.link, styles[variant], styles[color], className, {
				[styles.iconLeft]: iconPosition === IconPosition.left,
			}),
			onClick,
			disabled,
			children: (
				<>
					{children}
					{icon && <span className={styles.icon}>{iconElement}</span>}
				</>
			),
			'data-testid': 'Link',
		};

		return Tag === 'a' ? (
			<Anchor {...commonProps} href={href} />
		) : (
			<Tag {...commonProps} />
		);
	};
}

export const ButtonLink = withStyle(
	ButtonLinkVariant.button,
	ButtonLinkColor.secondary,
	IconPosition.left
);

export const AddLink = withStyle(
	ButtonLinkVariant.button,
	ButtonLinkColor.blue,
	IconPosition.right,
	<Icon name="add" />,
	'Добавить',
	'button'
);

export const ShowMoreLink = withStyle(
	ButtonLinkVariant.link,
	ButtonLinkColor.primary,
	IconPosition.right,
	<Icon name="chevronDown" />,
	'Показать ещё',
	'button'
);

export const GoToLink = withStyle(
	ButtonLinkVariant.link,
	ButtonLinkColor.secondary,
	IconPosition.right,
	<Icon name="arrowRight" />,
	'Подробнее'
);
