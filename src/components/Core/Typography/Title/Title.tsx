import clsx from 'clsx';
import styles from './Title.module.scss';
import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { TranslationKeys } from '@/i18n.ts';

export type HeaderTag = keyof Pick<
	React.JSX.IntrinsicElements,
	'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>;

export type TitleProps = {
	Tag?: HeaderTag;
	className?: string;
	value?: TranslationKeys;
	opts?: Record<string, unknown>;
} & PropsWithChildren;

export function Title({
	Tag = 'h3',
	children,
	value,
	opts,
	className,
}: TitleProps) {
	const { t } = useTranslation();
	const text = children ?? t(value!, opts);

	return (
		<Tag className={clsx(styles.title, className)} data-testid="Title">
			{text}
		</Tag>
	);
}
