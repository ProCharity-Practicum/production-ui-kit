import clsx from 'clsx';
import styles from './RadioGroup.module.scss';

export type RadioGroupProps = {
	className?: string;
};

export function RadioGroup({ className }: RadioGroupProps) {
	return (
		<div className={clsx(styles.container, className)} data-testid="RadioGroup">
			RadioGroup
		</div>
	);
}
