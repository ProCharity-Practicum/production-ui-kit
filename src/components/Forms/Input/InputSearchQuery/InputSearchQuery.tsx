import { Input, InputProps } from '@/components/Forms/Input/Input.tsx';
import { Icon } from '@/components/Core/Icon';

export function InputSearchQuery(props: Omit<InputProps, 'type'>) {
	return (
		<Input {...props} type="text">
			<Icon name={'search'} size={24} color={'#A0ABB5'} />
		</Input>
	);
}
