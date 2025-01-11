import { Input, InputProps } from '@/components/Forms/Input/Input.tsx';

export function InputEmail(props: Omit<InputProps, 'type'>) {
	return (
		<Input
			{...props}
			type={'email'}
			placeholder={'Электронная почта'}
			isClearable={true}
			tooltip="С 1 января 2025 года в России введен запрет на регистрацию с иностранной электронной почты. Используйте для регистрации российские почтовые сервисы Яндекс, VK, Rambler и другие с доменом .ru"
		/>
	);
}
