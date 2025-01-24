import clsx from 'clsx';
import styles from './Text.module.scss';
import React from 'react';
import { TextVariants } from '@/components/Core/Typography/Text/TextVariants.tsx';

export type TextTag = keyof React.JSX.IntrinsicElements;

export type TextProps = {
	className?: string;
	children?: React.ReactNode;
	variant?: TextVariants | keyof typeof TextVariants;
	Tag?: TextTag;
};

export function Text({
	className,
	children,
	variant = TextVariants.normal,
	Tag = 'span',
}: TextProps) {
	return (
		<Tag
			className={clsx(styles.container, className, styles[variant])}
			data-testid="Text"
		>
			{children}
		</Tag>
	);
}
