import clsx from 'clsx';
import styles from './Text.module.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TranslationKeys } from '@/i18n.ts';
import { TextVariants } from '@/components/Core/Typography/Text/TextVariants.tsx';

export type TextTag = keyof Pick<React.JSX.IntrinsicElements, 'p' | 'span'>;

export type TextProps = {
	className?: string;
	value?: TranslationKeys;
	opts?: Record<string, unknown>;
	children?: React.ReactNode;
	variant?: TextVariants;
	Tag?: TextTag;
};

export function Text({
	className,
	children,
	value,
	opts,
	variant = TextVariants.Normal,
	Tag = 'span',
}: TextProps) {
	const { t } = useTranslation();
	const text = children ?? t(value!, opts);

	return (
		<Tag
			className={clsx(styles.container, className, styles[variant])}
			data-testid="Text"
		>
			{text}
		</Tag>
	);
}
