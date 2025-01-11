import clsx from 'clsx';
import styles from './InputPassword.module.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { Input, InputProps } from '@/components/Forms/Input/Input.tsx';
import { Icon } from '@/components/Core/Icon';

export function InputPassword({
	value,
	onChange,
	...props
}: Omit<InputProps, 'type'>) {
	const [valueInput, setValueInput] = useState(value);
	const [isPasswordShown, setPasswordShown] = useState(false);

	const handleTogglePasswordShown = () => {
		setPasswordShown((currValue) => !currValue);
	};

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValueInput(e.target.value);
		onChange?.(e);
	};

	useEffect(() => {
		setValueInput(value || '');
	}, [value]);

	return (
		<Input
			{...props}
			type={isPasswordShown ? 'text' : 'password'}
			value={valueInput}
			onChange={onInputChange}
		>
			<button
				className={clsx(styles['input__button'])}
				onClick={handleTogglePasswordShown}
				type="button"
			>
				{isPasswordShown ? (
					<Icon name={'show'} size={24} color={'#A0ABB5'} />
				) : (
					<Icon name={'eyeCrossed'} size={24} color={'#A0ABB5'} />
				)}
			</button>
		</Input>
	);
}
