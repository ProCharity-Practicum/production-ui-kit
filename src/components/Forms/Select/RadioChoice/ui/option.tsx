import { useEffect, useRef } from 'react';
import { RadioChoiceProps } from '../types';
import style from '../style.module.scss';

export function Option({
	value = '',
	title,
	selected,
	groupName,
	onChange,
	setCurrentValue,
	isButtonLike,
	testId,
}: RadioChoiceProps) {
	const optionRef = useRef<HTMLDivElement>(null);

	const handleChange = () => {
		onChange?.(value);
		setCurrentValue?.(value);
	};

	useEffect(() => {
		const option = optionRef.current;

		if (!option) return;

		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (document.activeElement === option && event.key === 'Enter') {
				onChange?.(value);
				setCurrentValue?.(value);
			}
		};

		option.addEventListener('keydown', handleEnterKeyDown);

		return () => {
			option.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, [value, onChange, setCurrentValue]);

	const isChecked = value === selected;

	return (
		<div
			className={
				isButtonLike
					? `${style.item_buttonLike} ${style.border_buttonLike} ${
							isChecked && style.item_active_buttonLike
						}`
					: `${style.item} ${style.border} ${isChecked && style.item_active}`
			}
			key={value}
			tabIndex={0}
			ref={optionRef}
			onClick={handleChange}
		>
			<label
				className={
					isButtonLike
						? `${style.label_buttonLike} ${
								isChecked && style.label_active_buttonLike
							}`
						: `${style.label} ${isChecked && style.label_active}`
				}
			>
				<input
					className={style.input}
					type="radio"
					name={groupName}
					value={value}
					onChange={handleChange}
					checked={isChecked}
					tabIndex={-1}
					data-testid={testId ? testId : 'radio'}
				/>
				{title}
			</label>
		</div>
	);
}
