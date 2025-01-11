import { Input, InputProps } from '@/components/Forms/Input/Input.tsx';

export function InputDate(props: Omit<InputProps, 'type'>) {
	return <Input {...props} type="date" />;
}
