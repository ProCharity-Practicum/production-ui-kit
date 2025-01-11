import styles from './SelectNotificationPeriod.module.scss';

export type SelectNotificationPeriodProps = {
	onChange?: (value: string) => void;
	currentValue: 'Monday' | 'Appearance';
};

export function SelectNotificationPeriod({
	onChange = () => {},
	currentValue,
}: SelectNotificationPeriodProps) {
	const handleChange = () => {
		if (currentValue === 'Monday') {
			onChange('Appearance');
		} else {
			onChange('Monday');
		}
	};

	return (
		<div className={styles.container} data-testid={`SelectNotificationPeriod`}>
			<label
				className={`${styles.label} ${styles.label_first} ${currentValue === 'Monday' && styles.label_active}`}
			>
				<input
					className={styles.input}
					type="radio"
					onChange={handleChange}
					checked={currentValue === 'Monday'}
					disabled
				/>
				<span>Каждый понедельник</span>
			</label>
			<label
				className={`${styles.label} ${styles.label_second} ${currentValue === 'Appearance' && styles.label_active}`}
			>
				<input
					className={styles.input}
					type="radio"
					onChange={handleChange}
					checked={currentValue === 'Appearance'}
				/>
				<span>По мере появления</span>
			</label>
		</div>
	);
}
