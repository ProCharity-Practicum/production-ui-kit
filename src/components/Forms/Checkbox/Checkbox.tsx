import styles from './Checkbox.module.scss';
import { InputHTMLAttributes, ReactNode } from 'react';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
	children?: ReactNode;
};

export function Checkbox({ children, ...nativeProps }: CheckboxProps) {
	return (
		<label className={styles.checkbox}>
			<input
				type="checkbox"
				className={styles['checkbox__native-input']}
				{...nativeProps}
			/>
			<span className={styles['checkbox__pseudo-input']}>{children}</span>
		</label>
	);
}
