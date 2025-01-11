import { Input, InputProps } from '@/components/Forms/Input/Input.tsx';

export function InputTelegram(props: Omit<InputProps, 'type'>) {
	return (
		<Input
			{...props}
			type={'text'}
			placeholder={'Ник в Telegram без @ и ссылки'}
			isClearable={true}
			tooltip="В данный момент Telegram  —  это наиболее быстрый и надежный способ для нас связаться с тобой. Чтобы не пропустить сообщения от команды ProCharity или представителя фонда, рекомендуем указать юзернейм. Найти его можно в настройках мессенджера"
		/>
	);
}
