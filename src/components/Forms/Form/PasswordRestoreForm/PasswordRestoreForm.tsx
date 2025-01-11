import clsx from 'clsx';
import styles from './PasswordRestoreForm.module.scss';

export type PasswordRestoreFormProps = {
	className?: string;
};

export function PasswordRestoreForm({ className }: PasswordRestoreFormProps) {
	return (
		<div
			className={clsx(styles.container, className)}
			data-testid="PasswordRestoreForm"
		>
			PasswordRestoreForm
		</div>
	);
}
