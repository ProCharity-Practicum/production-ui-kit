import styles from './Input.module.scss';
import clsx from 'clsx';
import {
	ChangeEvent,
	forwardRef,
	ReactElement,
	useEffect,
	useState,
} from 'react';

import { Icon } from '@/components/Core/Icon';
import { Tooltip } from '@/components/Common/Tooltip/Tooltip.tsx';
import { TooltipPosition } from '@/components/Common/Tooltip/types.tsx';

export interface InputProps {
	className?: string;
	type: string;
	value?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	name?: string;
	placeholder?: string;
	children?: ReactElement;
	width?: string;
	readOnly?: boolean;
	tooltip?: string;
	tooltipPosition?: TooltipPosition;
	isClearable?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{
		value,
		onChange,
		onKeyDown,
		type,
		name,
		className,
		placeholder,
		children,
		width,
		readOnly,
		tooltip,
		tooltipPosition = TooltipPosition.Bottom,
		isClearable = true,
	},
	ref
) {
	const [valueInput, setValueInput] = useState(value);

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValueInput(e.target.value);
		onChange?.(e);
	};

	useEffect(() => {
		setValueInput(value || '');
	}, [value]);

	const handleClearClick = () => {
		setValueInput('');
	};

	return (
		<div
			className={clsx(styles.container, className)}
			style={{ width }}
			data-testid="Input"
		>
			<input
				type={type}
				value={valueInput}
				onChange={onInputChange}
				onKeyDown={onKeyDown}
				className={clsx(styles['input__field'])}
				name={name}
				ref={ref}
				placeholder={placeholder}
				readOnly={readOnly}
			/>
			<div className={styles['input__controls']}>
				{isClearable && (
					<button
						type="button"
						onClick={handleClearClick}
						className={clsx(styles['input__button'], {
							[styles.hidden]: !valueInput,
						})}
					>
						<Icon name={'close'} size={24} color={'#A0ABB5'} />
					</button>
				)}
				{children}
				{tooltip && (
					<Tooltip position={tooltipPosition} text={tooltip}>
						<Icon
							name={'question'}
							size={24}
							color={'#A0ABB5'}
							className={styles['input__button_question']}
						/>
					</Tooltip>
				)}
			</div>
		</div>
	);
});
