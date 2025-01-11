import { Input, InputProps } from '@/components/Forms/Input/Input.tsx';

export function InputCity(props: Omit<InputProps, 'type'>) {
	return (
		<Input
			{...props}
			type={'text'}
			placeholder={'Название города'}
			isClearable={true}
			tooltip="Укажи город, если планируешь помогать фондам офлайн"
		/>
	);
}
