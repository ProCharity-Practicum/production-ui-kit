import clsx from 'clsx';
import styles from './Image.module.scss';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

export type ImageProps = DetailedHTMLProps<
	ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
>;

export function Image({ className, alt, ...props }: ImageProps) {
	return (
		<img
			data-testid="Image"
			{...props}
			className={clsx(styles.container, className)}
			alt={alt}
		/>
	);
}
