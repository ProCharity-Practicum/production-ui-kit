import { useState, useRef } from 'react';
import styles from './Select.module.scss';
import ArrowRoundedUp from './icon_arrow_rounded_up_light.svg';
import ArrowRoundedDown from './icon_arrow_rounded_down_light.svg';

type Option = string | object;

export type SelectProps = {
	label: string;
	options: Option[];
	optionLabel: string;
	value?: string;
	name?: string;
	onChange?: (selectedValue: string, name?: string) => void;
};

export function Select({
	label,
	options,
	optionLabel,
	value = '',
	name,
	onChange,
}: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [internalValue, setInternalValue] = useState(value);
	const selectRef = useRef<HTMLDivElement>(null);

	const getDisplayText = (option: Option): string => {
		if (typeof option === 'string') return option;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		return String(Object(option)[optionLabel]);
	};

	const getOptionValue = (option: Option): string => {
		if (typeof option === 'string') return option;
		// Сначала проверяем стандартное поле 'value', затем 'id', затем любое другое поле
		if ('value' in option) return String(option.value);
		if ('id' in option) return String(option.id);
		return JSON.stringify(option);
	};

	const handleOptionClick = (selectedValue: string) => {
		setIsOpen(false);
		setInternalValue(selectedValue);
		onChange?.(selectedValue, name);
	};

	const handleBlur = (e: React.FocusEvent) => {
		if (!selectRef.current?.contains(e.relatedTarget as Node)) {
			setIsOpen(false);
		}
	};

	const selectedOption = options.find(
		(option) => getOptionValue(option) === internalValue
	);

	return (
		<div
			className={styles.select}
			data-testid="Select"
			ref={selectRef}
			onBlur={handleBlur}
			tabIndex={0}
		>
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
					{internalValue !== '' && selectedOption && (
						<p className={styles.value}>{getDisplayText(selectedOption)}</p>
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
						const displayText = getDisplayText(option);
						const optionValue = getOptionValue(option);
						if (optionValue === internalValue) return null;
						return (
							<div
								key={`${optionValue}-${index}`}
								className={styles.option}
								onClick={() => handleOptionClick(optionValue)}
							>
								<p className={styles.optionText}>{displayText}</p>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
