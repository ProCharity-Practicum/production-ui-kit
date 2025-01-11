import { useState } from 'react';
import styles from './Select.module.scss';
import ArrowRoundedUp from '../../../assets/icon_arrow_rounded_up_light.svg';
import ArrowRoundedDown from '../../../assets/icon_arrow_rounded_down_light.svg';

export type SelectProps = {
	label: string;
	options: string[];
	currentValue?: string;
};

export function Select({ label, options, currentValue = '' }: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [value, setValue] = useState(currentValue);

	return (
		<div className={styles.select} data-testid="Select">
			<div
				className={`${styles.panel} ${isOpen && styles.panel_open}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className={styles.panel__text}>
					<label
						className={`${styles.label} ${value !== '' && styles.label_active}`}
					>
						{label}
					</label>
					{value !== '' && <p className={styles.value}>{value}</p>}
				</div>
				<img
					className={styles.arrow}
					src={isOpen ? ArrowRoundedUp : ArrowRoundedDown}
					alt={isOpen ? 'Стрелка вверх' : 'Стрелка вниз'}
				/>
			</div>
			{!isOpen ? null : (
				<div className={styles.options}>
					{options.map((option, index) => {
						if (option === value) return;
						return (
							<div
								key={index}
								className={styles.option}
								onClick={() => {
									setValue(option);
									setIsOpen(false);
								}}
							>
								<p className={styles.optionText}>{option}</p>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
