import styles from './Toggle.module.scss';
import { useState } from 'react';

export type ToggleProps = {
	checked?: boolean;
	text?: string;
};

export function Toggle({ checked = false, text = '' }: ToggleProps) {
	const [isChecked, setIsChecked] = useState(checked);

	const onClick = () => {
		setIsChecked(!isChecked);
	};

	return (
		<div className={styles.toggle} data-testid="Toggle">
			<p className={styles.text}>{text}</p>
			<button
				onClick={onClick}
				className={`${styles.button} ${isChecked && styles.button_active}`}
			>
				<div
					className={`${styles.cyrcleIcon} ${isChecked && styles.cyrcleIcon_active}`}
				/>
			</button>
		</div>
	);
}
