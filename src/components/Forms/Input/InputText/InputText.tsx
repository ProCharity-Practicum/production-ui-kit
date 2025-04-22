import clsx from 'clsx';
import styles from './InputText.module.scss';
import {
	ChangeEvent,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { Icon } from '@/components/Core/Icon';

export type InputTextProps = {
	className?: string;
	value?: string;
	width?: string;
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	placeholder?: string;
	maxLength?: number;
	name?: string;
};

export function InputText({
	className,
	value,
	width,
	onChange,
	placeholder,
	maxLength,
	name,
}: InputTextProps) {
	const [valueInput, setValueInput] = useState(value);
	const ref = useRef<HTMLTextAreaElement>(null);
	// const ref = useCombinedRefs(innerRef, controlRef);

	useEffect(() => {
		setValueInput(value || '');
	}, [value]);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setValueInput(e.target.value);
		if (typeof onChange === 'function') {
			onChange(e);
		}
	};

	const handleClearClick = () => {
		setValueInput('');
	};

	useLayoutEffect(() => {
		if (ref.current) {
			const input = ref.current;
			input.setSelectionRange(input.selectionStart, input.selectionEnd);
			ref.current.style.height = `auto`;

			requestAnimationFrame(() => {
				if (ref.current) {
					ref.current.style.height = `${ref.current?.scrollHeight}px`;
				}
			});
		}
	}, [valueInput, ref]);

	return (
		<div
			className={clsx(styles['container'], className)}
			data-testid="InputText"
		>
			<div
				className={clsx(
					styles['textarea'],
					value && value.length > 0 && styles['textarea_filled']
				)}
				style={{ width }}
			>
				<textarea
					ref={ref}
					name={name}
					className={clsx(
						styles['textarea__field'],
						styles['textarea__field_autosize']
					)}
					onChange={handleChange}
					value={valueInput}
					// rows={1}
					maxLength={maxLength}
					placeholder={placeholder}
				/>
				<div className={styles['textarea__btn-wrapper']}>
					{valueInput ? (
						<button
							type="button"
							onClick={handleClearClick}
							className={clsx(styles['textarea__btn'])}
						>
							<Icon name={'close'} size={24} color={'#A0ABB5'} />
						</button>
					) : null}
				</div>
				{maxLength && (
					<div
						className={styles['textarea__counter']}
						data-testid={'textarea-counter'}
					>
						{`${valueInput?.length || 0}/${maxLength}`}
					</div>
				)}
			</div>
		</div>
	);
}
