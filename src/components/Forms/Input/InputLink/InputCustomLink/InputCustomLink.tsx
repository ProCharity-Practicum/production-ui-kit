import clsx from 'clsx';
import styles from './InputCustomLink.module.scss';
import { InputLink } from '@/components/Forms/Input/InputLink/InputLink.tsx';
import { Input } from '@/components/Forms/Input/Input.tsx';

export interface LinkValue {
	name?: string;
	link?: string;
}

export type InputCustomLinkProps = {
	className?: string;
	value: LinkValue;
	onChange?: (value: LinkValue) => void;
	name?: string;
};

export function InputCustomLink({
	className,
	value,
	onChange,
	name,
}: InputCustomLinkProps) {
	return (
		<div
			className={clsx(styles.container, className)}
			data-testid="InputCustomLink"
		>
			<Input
				type={'text'}
				name={name}
				value={value?.name || ''}
				onChange={(e) =>
					onChange?.({
						...value,
						name: e.target.value,
					})
				}
			/>
			<InputLink
				name={name}
				value={value?.link || ''}
				onChange={(e) =>
					onChange?.({
						...value,
						link: e.target.value,
					})
				}
			/>
		</div>
	);
}
