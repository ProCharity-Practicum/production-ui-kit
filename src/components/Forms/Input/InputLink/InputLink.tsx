import { Input, InputProps } from '@/components/Forms/Input/Input.tsx';

export function InputLink(props: Omit<InputProps, 'type'>) {
	return <Input placeholder={'https://...'} {...props} type={'url'} />;
}
