import { useState } from 'react';
import styles from './Select.module.scss';
import ArrowRoundedUp from './assets/icon_arrow_rounded_up_light.svg';
import ArrowRoundedDown from './assets/icon_arrow_rounded_down_light.svg';

export type SelectProps = {
	label: string;
	options: string[];
	currentValue?: string;
	name?: string;
	onChange?: (selectedValue: string, name?: string) => void;
};

export function Select({
	label,
	options,
	currentValue = '',
	name,
	onChange,
}: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [internalValue, setInternalValue] = useState(currentValue);

	const handleOptionClick = (option: string) => {
		setIsOpen(false);
		setInternalValue(option);
		onChange?.(option, name);
	};

	return (
		<div className={styles.select} data-testid="Select">
			<div
				className={`${styles.panel} ${isOpen && styles.panel_open}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className={styles.panel__text}>
					<label
						className={`${styles.label} ${internalValue !== '' && styles.label_active}`}
					>
						{label}
					</label>
					{internalValue !== '' && (
						<p className={styles.value}>{internalValue}</p>
					)}
				</div>
				<img
					className={styles.arrow}
					src={isOpen ? ArrowRoundedUp : ArrowRoundedDown}
					alt={isOpen ? 'Стрелка вверх' : 'Стрелка вниз'}
				/>
			</div>
			{isOpen && (
				<div className={styles.options}>
					{options.map((option, index) => {
						if (option === internalValue) return null;
						return (
							<div
								key={index}
								className={styles.option}
								onClick={() => handleOptionClick(option)}
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
