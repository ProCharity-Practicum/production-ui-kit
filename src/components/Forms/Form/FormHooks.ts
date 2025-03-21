import { useContext } from 'react';
import { FormContext } from '@/components/Forms/Form/FormContext.tsx';

export function useForm() {
	return useContext(FormContext);
}
