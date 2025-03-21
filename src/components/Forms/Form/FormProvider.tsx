import {
	FormContext,
	FormContextProps,
} from '@/components/Forms/Form/FormContext.tsx';
import React from 'react';

export type FormProviderProps = FormContextProps & {
	children?: React.ReactNode;
};

export function FormProvider({ children, ...props }: FormProviderProps) {
	return (
		<FormContext.Provider value={{ ...props }}>{children}</FormContext.Provider>
	);
}
