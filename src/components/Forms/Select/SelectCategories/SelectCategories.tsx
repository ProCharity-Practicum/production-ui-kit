import styles from './SelectCategories.module.scss';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Checkbox } from '../../Checkbox/Checkbox';
import { Chips } from '../../Chips/Chips';
import { Icon } from '@/components/Core/Icon';

type MultipleOption = {
	title: string;
	values: string[];
};

export type SelectCategoriesProps = {
	onChange?: (values: string[]) => void;
	label: string;
	options: MultipleOption[];
	value?: string[];
	name?: string;
};

export function SelectCategories({
	onChange,
	label,
	options,
	value = [],
	name = 'categories',
}: SelectCategoriesProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [expand, setExpand] = useState<{ [key: number]: boolean }>({});
	const selectRef = useRef<HTMLDivElement>(null);
	const nativeSelectRef = useRef<HTMLSelectElement>(null);
	const isSingle = options.length <= 1;

	useEffect(() => {
		if (nativeSelectRef.current) {
			Array.from(nativeSelectRef.current.options).forEach((option) => {
				option.selected = value.includes(option.value);
			});
		}
	}, [value]);

	const totalOptions = useMemo(
		() =>
			options.reduce(
				(count, option) => count + (option.values?.length || 0),
				0
			),
		[options]
	);

	const toggleExpand = useCallback((index: number) => {
		setExpand((prev) => ({ ...prev, [index]: !prev[index] }));
	}, []);

	const handleClickOutside = useCallback((event: MouseEvent) => {
		if (
			selectRef.current &&
			!selectRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	}, []);

	const handleOptionToggle = useCallback(
		(optionValue: string) => {
			const newValues = value.includes(optionValue)
				? value.filter((v) => v !== optionValue)
				: [...value, optionValue];

			onChange?.(newValues);

			if (isSingle) {
				setIsOpen(false);
			}
		},
		[value, onChange, isSingle]
	);

	const handleChipDelete = useCallback(
		(deletedValue: string) => {
			onChange?.(value.filter((v) => v !== deletedValue));
		},
		[value, onChange]
	);

	const handleReset = useCallback(() => {
		onChange?.([]);
		setIsOpen(false);
	}, [onChange]);

	useEffect(() => {
		if (!isOpen) return;

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') setIsOpen(false);
		});

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, handleClickOutside]);

	return (
		<div
			className={styles.select}
			data-testid="SelectCategories"
			ref={selectRef}
		>
			{/* Скрытый нативный select для работы с формами */}
			<select
				ref={nativeSelectRef}
				name={name}
				multiple
				style={{ display: 'none' }}
				value={value}
			>
				{options.flatMap((option) =>
					option.values.map((value) => (
						<option key={value} value={value}>
							{value}
						</option>
					))
				)}
			</select>

			{/* Кастомный UI */}
			<div
				className={`${styles.selection} ${isOpen && styles.selection__open}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className={styles.selectionContent}>
					<label className={styles.label}>{label}</label>
					<div className={styles.chipsWrapper}>
						<Chips filters={value} onDelete={handleChipDelete} />
					</div>
				</div>
				<div className={styles.selectionControls}>
					{isOpen && (
						<p
							className={styles.selectionCount}
						>{`${value.length}/${totalOptions}`}</p>
					)}
					<Icon
						name={isOpen ? 'chevronUp' : 'chevronDown'}
						size={24}
						color="#A0ABB5"
					/>
				</div>
			</div>

			{isOpen && (
				<div className={styles.options}>
					<div className={styles.scroll}>
						{options.map((option, optIndex) => (
							<div key={optIndex} className={styles.optionGroup}>
								<p className={styles.optionTitle}>{option.title}</p>
								<div
									className={isSingle ? styles.singleWrap : styles.optionWrap}
								>
									{option.values
										.filter(
											(_, index) => isSingle || expand[optIndex] || index < 4
										)
										.map((val) => (
											<Checkbox
												key={val}
												checked={value.includes(val)}
												onChange={() => handleOptionToggle(val)}
												className={styles.option}
											>
												<p className={styles.checkboxText}>{val}</p>
											</Checkbox>
										))}
								</div>
								{!isSingle && option.values.length > 4 && (
									<div
										className={styles.multiplyLink}
										onClick={() => toggleExpand(optIndex)}
									>
										<p>
											{expand[optIndex]
												? 'Скрыть'
												: `Показать еще ${option.values.length - 4}`}
										</p>
										<Icon
											name={expand[optIndex] ? 'chevronUp' : 'chevronDown'}
											size={16}
											color="#048AA7"
										/>
									</div>
								)}
							</div>
						))}
					</div>

					{!isSingle && (
						<div className={styles.buttons}>
							<button
								type="button"
								className={styles.button}
								onClick={handleReset}
							>
								Сбросить все
							</button>
							<button
								type="button"
								className={styles.button}
								onClick={() => setIsOpen(false)}
							>
								Выбрать
								{value.length > 0 && (
									<div className={styles.buttonCountCircle}>
										<p className={styles.buttonCountCircleText}>
											{value.length}
										</p>
									</div>
								)}
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
