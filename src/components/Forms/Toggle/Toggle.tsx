import styles from './Toggle.module.scss';

export type ToggleProps = {
	checked?: boolean;
	onChange?: (isChecked: boolean) => void;
	text?: string;
};

export function Toggle({ checked = false, onChange, text = '' }: ToggleProps) {
	const onClick = () => {
		onChange?.(!checked); // Уведомляем родителя
	};

	return (
		<div className={styles.toggle}>
			<p className={styles.text}>{text}</p>
			<button
				onClick={onClick}
				className={`${styles.button} ${checked && styles.button_active}`}
			>
				<div
					className={`${styles.cyrcleIcon} ${checked && styles.cyrcleIcon_active}`}
				/>
			</button>
		</div>
	);
}
