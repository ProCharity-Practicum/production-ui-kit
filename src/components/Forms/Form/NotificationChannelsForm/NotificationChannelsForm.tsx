import clsx from 'clsx';
import styles from './NotificationChannelsForm.module.scss';

export type NotificationChannelsFormProps = {
	className?: string;
};

export function NotificationChannelsForm({
	className,
}: NotificationChannelsFormProps) {
	return (
		<div
			className={clsx(styles.container, className)}
			data-testid="NotificationChannelsForm"
		>
			NotificationChannelsForm
		</div>
	);
}
