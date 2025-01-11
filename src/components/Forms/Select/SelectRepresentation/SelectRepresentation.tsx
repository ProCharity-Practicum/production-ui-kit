import clsx from 'clsx';
import styles from './SelectRepresentation.module.scss';

export type SelectRepresentationProps = {
	className?: string;
};

export function SelectRepresentation({ className }: SelectRepresentationProps) {
	return (
		<div
			className={clsx(styles.container, className)}
			data-testid="SelectRepresentation"
		>
			SelectRepresentation
		</div>
	);
}
