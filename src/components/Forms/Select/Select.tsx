import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Select.module.scss';
import ArrowRoundedUp from './icon_arrow_rounded_up_light.svg';
import ArrowRoundedDown from './icon_arrow_rounded_down_light.svg';

export type Option = string | Record<string, unknown>;

export type SelectProps = {
	label: string;
	options: Option[];
	optionLabel?: string;
	value?: Option | null;
	onChange?: (selectedOption: Option, name?: string) => void;
	name?: string;
	// Новые пропсы для HOC
	customDisplayValue?: string;
	renderOption?: (option: Option) => React.ReactNode;
	closeOnSelect?: boolean;
};

export function Select({
	label,
	options,
	optionLabel = '',
	value = null,
	name,
	onChange,
	customDisplayValue,
	renderOption,
	closeOnSelect,
}: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);
	const nativeSelectRef = useRef<HTMLSelectElement>(null);

	const getDisplayText = useCallback(
		(option: Option | null): string => {
			if (!option) return '';
			if (typeof option === 'string') return option;
			const labelValue = optionLabel ? option[optionLabel] : '';
			return typeof labelValue === 'string' || typeof labelValue === 'number'
				? String(labelValue)
				: '';
		},
		[optionLabel]
	);

	// Синхронизируем значение с нативным select
	useEffect(() => {
		if (nativeSelectRef.current && value !== null) {
			nativeSelectRef.current.value =
				typeof value === 'string' ? value : JSON.stringify(value);
		}
	}, [value]);

	const handleOptionClick = (option: Option) => {
		if (closeOnSelect !== false) {
			// Закрываем только если closeOnSelect не false
			setIsOpen(false);
		}
		onChange?.(option, name);

		if (nativeSelectRef.current) {
			const stringValue =
				typeof option === 'string' ? option : JSON.stringify(option);
			nativeSelectRef.current.value = stringValue;

			// Важно: имитация события change для корректной работы форм
			nativeSelectRef.current.dispatchEvent(
				new Event('change', { bubbles: true })
			);
		}
	};

	const handleBlur = (e: React.FocusEvent) => {
		if (!selectRef.current?.contains(e.relatedTarget as Node)) {
			setIsOpen(false);
		}
	};

	return (
		<div
			className={styles.select}
			data-testid="Select"
			ref={selectRef}
			onBlur={handleBlur}
			tabIndex={0}
		>
			{/* Скрытый нативный select для работы с формами */}
			<select
				ref={nativeSelectRef}
				name={name}
				style={{ display: 'none' }}
				value={
					value
						? typeof value === 'string'
							? value
							: JSON.stringify(value)
						: ''
				}
				onChange={() => {}}
			>
				{!value && <option value="" />}
				{options.map((option, index) => (
					<option
						key={index}
						value={typeof option === 'string' ? option : JSON.stringify(option)}
					>
						{getDisplayText(option)}
					</option>
				))}
			</select>
			{/* Кастомный UI */}
			<div
				className={`${styles.panel} ${isOpen && styles.panel_open}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className={styles.panel__text}>
					<label
						className={`${styles.label} ${
							(value !== null || customDisplayValue) && styles.label_active
						}`}
					>
						{label}
					</label>
					{(value !== null || customDisplayValue) && (
						<p className={styles.value}>
							{customDisplayValue || getDisplayText(value)}
						</p>
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
					{options.map((option, index) => (
						<div
							key={`${typeof option === 'string' ? option : JSON.stringify(option)}-${index}`}
							className={styles.option}
							onClick={() => handleOptionClick(option)}
						>
							{renderOption ? (
								renderOption(option) // Используем renderOption если передан
							) : (
								<p className={styles.optionText}>{getDisplayText(option)}</p>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
