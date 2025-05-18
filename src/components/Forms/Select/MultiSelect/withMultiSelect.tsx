import { useState, useEffect, useRef } from 'react';
import type { SelectProps, Option } from '../Select';
import styles from '../Select.module.scss';

export function withMultiSelect(
	SelectComponent: React.ComponentType<SelectProps>
) {
	return function MultiSelectWrapper({
		value: propValue = [],
		onChange,
		maxDisplayedItems = 3,
		name,
		...props
	}: Omit<SelectProps, 'value' | 'onChange'> & {
		value?: Option[];
		onChange?: (selectedOptions: Option[], name?: string) => void;
		maxDisplayedItems?: number;
	}) {
		const [selectedValues, setSelectedValues] = useState<Option[]>(propValue);
		const hiddenSelectRef = useRef<HTMLSelectElement>(null);

		// Синхронизация с нативным select
		useEffect(() => {
			if (hiddenSelectRef.current) {
				// Очищаем текущие selected
				Array.from(hiddenSelectRef.current.options).forEach((opt) => {
					opt.selected = false;
				});

				// Устанавливаем выбранные значения
				selectedValues.forEach((val) => {
					const stringValue =
						typeof val === 'string' ? val : JSON.stringify(val);
					const option = Array.from(
						hiddenSelectRef.current?.options || []
					).find((opt) => opt.value === stringValue);
					if (option) option.selected = true;
				});
			}
		}, [selectedValues]);

		const toggleOption = (option: Option, name?: string) => {
			const newValues = selectedValues.some((v) => compareOptions(v, option))
				? selectedValues.filter((v) => !compareOptions(v, option))
				: [...selectedValues, option];

			setSelectedValues(newValues);
			onChange?.(newValues, name);

			// Триггерим изменение нативного select
			if (hiddenSelectRef.current) {
				const event = new Event('change', { bubbles: true });
				hiddenSelectRef.current.dispatchEvent(event);
			}
		};

		const getDisplayValue = () => {
			if (!selectedValues.length) return '';
			const displayed = selectedValues
				.slice(0, maxDisplayedItems)
				.map((v) => getOptionLabel(v, props.optionLabel));
			return selectedValues.length > maxDisplayedItems
				? `${displayed.join(', ')} +${selectedValues.length - maxDisplayedItems}`
				: displayed.join(', ');
		};

		return (
			<>
				{/* Скрытый нативный select для работы с формами */}
				<select
					ref={hiddenSelectRef}
					name={name}
					multiple
					style={{ display: 'none' }}
					onChange={() => {}}
				>
					{props.options.map((option, index) => (
						<option
							key={index}
							value={
								typeof option === 'string' ? option : JSON.stringify(option)
							}
						>
							{getOptionLabel(option, props.optionLabel)}
						</option>
					))}
				</select>

				{/* Кастомный селект */}
				<SelectComponent
					{...props}
					value={null}
					onChange={toggleOption}
					closeOnSelect={false}
					customDisplayValue={getDisplayValue()}
					renderOption={(option: Option) => (
						<div className={styles.option}>
							<span
								className={`${styles.checkbox} ${
									selectedValues.some((v) => compareOptions(v, option))
										? styles.checked
										: ''
								}`}
							/>
							<span className={styles.optionText}>
								{getOptionLabel(option, props.optionLabel)}
							</span>
						</div>
					)}
				/>
			</>
		);
	};
}

// Вспомогательные функции без изменений
const compareOptions = (a: Option, b: Option) =>
	typeof a === 'string' || typeof b === 'string'
		? a === b
		: JSON.stringify(a) === JSON.stringify(b);

const getOptionLabel = (option: Option, labelKey?: string) => {
	if (typeof option === 'string') return option;
	if (!labelKey) return '';
	const value = option[labelKey];
	return typeof value === 'string' || typeof value === 'number'
		? String(value)
		: '';
};
