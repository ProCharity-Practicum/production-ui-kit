import clsx from 'clsx';
import styles from './Form.module.scss';
import { useForm } from '@/components/Forms/Form/FormHooks.ts';
import React, { FormHTMLAttributes } from 'react';

export type FormProps = {
	className?: string;
	children?: React.ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;

export function Form({ className, children, ...props }: FormProps) {
	const { FormElement } = useForm();
	return (
		<FormElement
			data-testid="Form"
			{...props}
			className={clsx(styles.container, className)}
		>
			{children}
		</FormElement>
	);
}
