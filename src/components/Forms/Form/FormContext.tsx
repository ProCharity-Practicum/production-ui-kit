import React, { FormHTMLAttributes, FunctionComponent } from 'react';

export type FormProps = FormHTMLAttributes<HTMLFormElement>;

export type FormTag =
	| keyof Pick<React.JSX.IntrinsicElements, 'form'>
	| FunctionComponent<FormProps>;

export type FormContextProps = {
	FormElement: FormTag;
};

export const FormContext = React.createContext<FormContextProps>({
	FormElement: 'form',
});
