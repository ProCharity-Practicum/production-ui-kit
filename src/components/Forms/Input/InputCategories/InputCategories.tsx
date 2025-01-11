import clsx from 'clsx';
import styles from './InputCategories.module.scss';
import { Input } from '@/components/Forms/Input/Input.tsx';
import { Icon } from '@/components/Core/Icon';
import { ChangeEvent, useState } from 'react';
import { Chips } from '@/components/Forms/Chips/Chips.tsx';

export type InputCategoriesProps = {
	className?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	filters: string[];
};

export function InputCategories({
	className,
	onChange,
	filters,
}: InputCategoriesProps) {
	const [isOpen, setOpen] = useState(false);
	const handleClick = () => {
		setOpen((currValue) => !currValue);
	};
	return (
		<>
			<Input
				type={'text'}
				className={clsx(styles.container, className)}
				readOnly={true}
				onChange={onChange}
				isClearable={false}
			>
				<div className={styles['input__controls']}>
					<button
						type="button"
						className={clsx(styles['input__button'])}
						onClick={handleClick}
					>
						<Icon name={'chevronDown'} size={24} color={'#A0ABB5'} />
					</button>
				</div>
			</Input>
			{isOpen ? (
				<div className={styles['chips_wrapper']}>
					<Chips filters={filters} />
				</div>
			) : null}
		</>
	);
}
