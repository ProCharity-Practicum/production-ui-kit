import clsx from 'clsx';
import styles from './ChangePasswordForm.module.scss';

export type ChangePasswordFormProps = {
	className?: string;
};

export function ChangePasswordForm({ className }: ChangePasswordFormProps) {
	return (
		<div
			className={clsx(styles.container, className)}
			data-testid="ChangePasswordForm"
		>
			ChangePasswordForm
		</div>
	);
}
