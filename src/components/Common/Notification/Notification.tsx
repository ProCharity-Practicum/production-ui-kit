import styles from './Notification.module.scss';
import { Icon } from '@/components/Core/Icon';

export const NotificationIcon = {
	success: 'success',
	clock: 'clock',
	warningNotification: 'warningNotification',
} as const;

export type TNotification = keyof typeof NotificationIcon;

export type NotificationProps = {
	title?: string;
	text?: string;
	iconPin?: TNotification;
	onCLick: () => void;
};

export function Notification({
	title,
	text,
	iconPin = NotificationIcon.warningNotification,
	onCLick,
}: NotificationProps) {
	return (
		<div className={styles.container} data-testid="Notification">
			<div className={`${styles.infoIcon} ${styles['infoIcon__' + iconPin]}`}>
				<Icon name={iconPin} size={18} />
			</div>
			<div className={styles.infoBlock}>
				{title !== '' && <h2 className={styles.title}>{title}</h2>}
				<p className={styles.text}>{text}</p>
			</div>
			<div className={styles.close} onClick={onCLick}>
				<Icon name="close" size={17} />
			</div>
		</div>
	);
}
