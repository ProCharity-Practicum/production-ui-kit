import styles from './SelectCategories.module.scss';
import { useEffect, useState } from 'react';
import { Checkbox } from '../../Checkbox/Checkbox';
import { Chips } from '../../Chips/Chips';
import { Icon } from '@/components/Core/Icon';

type MultipleOption = {
	title: string;
	values: string[];
};

export type SelectCategoriesProps = {
	setInitialValues?: (values: string[]) => void;
	label: string;
	options: MultipleOption[];
	initialValues?: string[];
};

export function SelectCategories({
	setInitialValues = () => {},
	label,
	options,
	initialValues = [],
}: SelectCategoriesProps) {
	const [expand, setExpand] = useState<{ [key: number]: boolean }>({});
	const [isOpen, setIsOpen] = useState(false);
	const [values, setValues] = useState(initialValues);
	const isSingle = options.length <= 1;

	const toggleExpand = (index: number) => {
		setExpand((prevExpand) => ({ ...prevExpand, [index]: !prevExpand[index] }));
	};

	const countAllvalues = (options: MultipleOption[]) => {
		return options.reduce((count, option) => {
			if ('values' in option) {
				return count + option.values.length;
			} else {
				return count;
			}
		}, 0);
	};

	const result = countAllvalues(options);

	useEffect(() => {}, [initialValues]);

	function onHandleClick(e: React.MouseEvent) {
		const target = e.target as HTMLElement;
		
		// 1. Проверяем клик по чипсам через data-testid
		const isChipClick = target.closest('[data-testid="Element_chips"]') !== null;
		
		// 2. Дополнительная проверка по элементам кнопки удаления
		const isDeleteButtonClick = 
		  target.closest('button') !== null ||
		  target.closest('svg') !== null ||
		  target.closest('path') !== null;
		
		// 3. Проверяем, что это именно кнопка удаления в чипсах
		const isChipDeleteButton = isDeleteButtonClick && isChipClick;
	  
		// Игнорируем только клики по чипсам или их кнопкам удаления
		if (isChipClick || isChipDeleteButton) {
		  return;
		}
	  
		// Обрабатываем клик для всех остальных случаев
		if (isOpen) {
		  setIsOpen(false);
		  setValues(initialValues);
		} else {
		  setIsOpen(true);
		}
	  }

	function onDeleteOption(value: string): void {
		setValues(values.filter((item) => item !== value));
		setInitialValues(values.filter((item) => item !== value));
	}

	function onClickMultipleOption(value: string): void {
		if (values.includes(value)) {
			setValues(values.filter((item) => item !== value));
			if (isSingle) {
				setInitialValues(values.filter((item) => item !== value));
			}
		} else {
			setValues([...values, value]);
			if (isSingle) {
				setInitialValues([...values, value]);
			}
		}
	}

	function onClickResetOption(): void {
		setValues([]);
		setInitialValues([]);
		setIsOpen(false);
	}

	function onClickSubmit(): void {
		setInitialValues(values);
		setIsOpen(false);
	}

	return (
		<div className={styles.select} data-testid="SelectCategories">
			<div
				className={`${styles.selection} ${isOpen && styles.selection__open}`}
				onClick={onHandleClick}
			>
				<div className={styles.selectionContent}>
					<label className={styles.label}>{label}</label>
					<div className={styles.chipsWrapper}>
						<Chips filters={initialValues} onDelete={onDeleteOption} />
					</div>
				</div>
				<div className={styles.selectionControls}>
					{isOpen && (
						<p className={styles.selectionCount}>
							<span>{`${values.length}/${result}`}</span>
						</p>
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
						{options &&
							options.map((option, optIndex) => (
								<div key={optIndex} className={styles.optionGroup}>
									<p className={styles.optionTitle}>{option.title}</p>
									<div
										className={`${isSingle ? styles.singleWrap : styles.optionWrap} ${
											isSingle
												? styles.single
												: expand[optIndex]
													? styles.expanded
													: styles.collapsed
										}`}
									>
										{option.values.map((value, index) => {
											const isSelect = values.some((item) => item === value);

											return (
												<Checkbox
													key={index}
													checked={isSelect}
													onChange={() => onClickMultipleOption(value)}
													className={styles.option}
												>
													<p className={styles.checkboxText}>{value}</p>
												</Checkbox>
											);
										})}
									</div>
									{!isSingle && (
										<div
											className={styles.multiplyLink}
											onClick={() => toggleExpand(optIndex)}
										>
											<p>
												{expand[optIndex] ? (
													'Скрыть'
												) : option.values.length > 4 ? (
													<span>
														Показать еще&nbsp;
														<span>{option.values.length - 4}</span>
													</span>
												) : null}
											</p>
											{option.values.length > 4 && (
												<Icon
													name={expand[optIndex] ? 'chevronUp' : 'chevronDown'}
													size={16}
													color="#048AA7"
												/>
											)}
										</div>
									)}
								</div>
							))}
					</div>

					{!isSingle && (
						<div className={styles.buttons}>
							<button
								type="reset"
								className={styles.button}
								onClick={onClickResetOption}
							>
								Сбросить все
							</button>
							<button
								type="button"
								className={styles.button}
								onClick={onClickSubmit}
							>
								Выбрать
								{values.length > 0 && (
									<div className={styles.buttonCountCircle}>
										<p
											className={`${styles.buttonCountCircleText} ${styles.numberText}`}
										>
											{values.length}
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
