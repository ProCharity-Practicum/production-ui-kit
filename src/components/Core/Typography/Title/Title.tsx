import clsx from 'clsx';
import styles from './Title.module.scss';
import React, {
	DetailedHTMLProps,
	HTMLAttributes,
	PropsWithChildren,
} from 'react';

export type HeaderTag = keyof Pick<
	React.JSX.IntrinsicElements,
	'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>;

export type TitleProps = {
	Tag?: HeaderTag;
} & PropsWithChildren &
	DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

export function Title({
	Tag = 'h3',
	children,
	className,
	...props
}: TitleProps) {
	return (
		<Tag
			data-testid="Title"
			{...props}
			className={clsx(styles.title, className)}
		>
			{children}
		</Tag>
	);
}
