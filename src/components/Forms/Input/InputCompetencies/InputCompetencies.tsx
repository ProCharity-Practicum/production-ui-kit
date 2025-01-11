import clsx from 'clsx';
import styles from './InputCompetencies.module.scss';
import { Input } from '@/components/Forms/Input/Input.tsx';
import { Icon } from '@/components/Core/Icon';
import { ChangeEvent } from 'react';

export type InputCompetenciesProps = {
	className?: string;
	onClick?: () => void;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function InputCompetencies({
	className,
	onClick,
	onChange,
}: InputCompetenciesProps) {
	return (
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
					onClick={onClick}
				>
					<Icon name={'chevronDown'} size={24} color={'#A0ABB5'} />
				</button>
			</div>
		</Input>
	);
}
