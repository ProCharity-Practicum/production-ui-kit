import clsx from 'clsx';
import styles from './AuthForm.module.scss';

export type AuthFormProps = {
	className?: string;
};

export function AuthForm({ className }: AuthFormProps) {
	return (
		<div className={clsx(styles.container, className)} data-testid="AuthForm">
			AuthForm
		</div>
	);
}
