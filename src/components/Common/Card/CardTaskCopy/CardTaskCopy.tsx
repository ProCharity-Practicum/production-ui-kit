import clsx from 'clsx';
import styles from './CardTaskCopy.module.scss';

export type CardTaskCopyProps = {
	className?: string;
};

export function CardTaskCopy({ className }: CardTaskCopyProps) {
	return (
		<div
			className={clsx(styles.container, className)}
			data-testid="CardTaskCopy"
		>
			CardTaskCopy
		</div>
	);
}
