import clsx from 'clsx';
import React from 'react';
import styles from './Message.module.scss';

export type MessageProps = {
	title: string;
	text: string;
	image?: string;
	children?: React.ReactNode;
	HeadTag?: keyof HTMLElementTagNameMap;
};

export function Message({
	title,
	text,
	image,
	children,
	HeadTag = 'h1',
}: MessageProps) {
	return (
		<div className={clsx(styles.container)} data-testid="Message">
			<div className={clsx(styles.pageContent)}>
				<HeadTag className={clsx(styles.title)}>{title}</HeadTag>
				<p className={clsx(styles.paragraph)}>{text}</p>
				{children && <div className={clsx(styles.children)}>{children}</div>}
			</div>
			<figure className={clsx(styles.imageWrapper)}>
				{image && <img src={image} className={clsx(styles.img)} alt={title} />}
			</figure>
		</div>
	);
}
