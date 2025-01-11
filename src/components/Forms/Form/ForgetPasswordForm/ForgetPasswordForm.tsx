import clsx from 'clsx';
import styles from './ForgetPasswordForm.module.scss';

export type ForgetPasswordFormProps = {
	className?: string;
};

export function ForgetPasswordForm({ className }: ForgetPasswordFormProps) {
	return (
		<div
			className={clsx(styles.container, className)}
			data-testid="ForgetPasswordForm"
		>
			ForgetPasswordForm
		</div>
	);
}
