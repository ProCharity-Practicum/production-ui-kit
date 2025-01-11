import clsx from 'clsx';
import styles from './Form.module.scss';

export type FormProps = {
	className?: string;
};

export function Form({ className }: FormProps) {
	return (
		<div className={clsx(styles.container, className)} data-testid="Form">
			Form
		</div>
	);
}
