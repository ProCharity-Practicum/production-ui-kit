import styles from './HelpSelector.module.scss';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Checkbox } from '../../Checkbox/Checkbox';
import { Icon } from '@/components/Core/Icon';

type MultipleOption = {
	title: string;
	values: string[];
};

export type HelpSelectorProps = {
	setInitialValues?: (values: string[]) => void;
	label: string;
	options: MultipleOption[];
	initialValues?: string[];
};

export function HelpSelector({
	setInitialValues = () => {},
	label,
	options,
	initialValues = [],
}: HelpSelectorProps) {
	const [expand, setExpand] = useState<{ [key: number]: boolean }>({});
	const [isOpen, setIsOpen] = useState(false);
	const [values, setValues] = useState(initialValues);
	const isSingle = options.length <= 1;
	const selectRef = useRef<HTMLDivElement>(null);

	const toggleExpand = useCallback((index: number) => {
		setExpand((prev) => ({ ...prev, [index]: !prev[index] }));
	}, []);

	const closeDropdown = useCallback(() => {
		setIsOpen(false);
		setValues(initialValues);
	}, [initialValues]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				closeDropdown();
			}
		};

		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') closeDropdown();
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('keydown', handleEscapeKey);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscapeKey);
		};
	}, [isOpen, closeDropdown]);

	useEffect(() => {
		setValues(initialValues);
	}, [initialValues]);

	const onHandleClick = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			if (isOpen) {
				setIsOpen(false);
				setValues(initialValues);
			} else {
				setIsOpen(true);
			}
		},
		[isOpen, initialValues]
	);

	const onClickMultipleOption = useCallback(
		(value: string) => {
			setValues((prev) => {
				const newValues = prev.includes(value)
					? prev.filter((item) => item !== value)
					: [...prev, value];
				if (isSingle) setInitialValues(newValues);
				return newValues;
			});
		},
		[isSingle, setInitialValues]
	);

	const onClickResetOption = useCallback(() => {
		setValues([]);
		setInitialValues([]);
		setIsOpen(false);
	}, [setInitialValues]);

	const onClickSubmit = useCallback(() => {
		setInitialValues(values);
		setIsOpen(false);
	}, [values, setInitialValues]);

	return (
		<div className={styles.select} data-testid="HelpSelector" ref={selectRef}>
			<div
				className={`${styles.selection} ${isOpen && styles.selection__open}`}
				onClick={onHandleClick}
			>
				<div className={styles.selectionContent}>
					<label className={styles.label}>{label}</label>
				</div>
				<div className={styles.selectionControls}>
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
									className={`${isSingle ? styles.singleWrap : styles.optionWrap}`}
								>
									{option.values
										.filter(
											(_, index) => isSingle || expand[optIndex] || index < 4
										)
										.map((value) => (
											<Checkbox
												key={value}
												checked={values.includes(value)}
												onChange={() => onClickMultipleOption(value)}
												className={styles.option}
											>
												<p className={styles.checkboxText}>{value}</p>
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

					{/* Кнопки точно присутствуют в этом месте */}
					<div className={styles.buttons}>
						<button
							type="button"
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
									<p className={styles.buttonCountCircleText}>
										{values.length}
									</p>
								</div>
							)}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
