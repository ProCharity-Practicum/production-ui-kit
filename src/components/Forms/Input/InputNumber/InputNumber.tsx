import { Input, InputProps } from '@/components/Forms/Input/Input.tsx';

export function InputNumber(props: Omit<InputProps, 'type'>) {
	return <Input {...props} type={'number'} />;
}
