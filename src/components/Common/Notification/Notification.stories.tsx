import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Notification } from './Notification';

const meta: Meta<typeof Notification> = {
	title: 'Common/Utils/Notification',
	component: Notification,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {},
	decorators: [
		(Story) => (
			<div style={{ minWidth: '360px' }}>
				<Story />
			</div>
		),
	],
};
export default meta;
type Story = StoryObj<typeof Notification>;

const onCLose = () => {
	alert('Закрытие уведомления');
};

export const Default: Story = {
	args: {
		title: 'Проверьте расширения файлов',
		text: 'Можно выбрать jpg, png или pdf',
		iconPin: 'warningNotification',
		onCLick: onCLose,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Notification');
		await expect(element).toBeInTheDocument();
	},
};

export const ModeratingProfile: Story = {
	args: {
		title: 'Профиль на модерации',
		text: 'Обычно это занимает до 2 рабочих дней. Как только все проверим, пришлем уведомление.',
		iconPin: 'warningNotification',
		onCLick: onCLose,
	},
};

export const FailedToLoad: Story = {
	args: {
		title: 'Name_Surname_CV.pdf',
		text: 'Не удалось загрузить файл',
		iconPin: 'warningNotification',
		onCLick: onCLose,
	},
};

export const EmailCopied: Story = {
	args: {
		title: '',
		text: 'Почтовый адрес волонтера скопирован в буфер обмена',
		iconPin: 'success',
		onCLick: onCLose,
	},
};

export const CheckingLink: Story = {
	args: {
		title: 'Проверяем ссылку',
		text: 'Обычно это занимает до 2 рабочих дней. Как только проверим, опубликуем ссылку на странице «Пожертвования».',
		iconPin: 'clock',
		onCLick: onCLose,
	},
};

export const SentInviTation: Story = {
	args: {
		title: '',
		text: 'Приглашение и пароль для входа в личный кабинет отправили на электронную почту user@mail.ru',
		iconPin: 'success',
		onCLick: onCLose,
	},
};

export const FailToAddEmployee: Story = {
	args: {
		title: 'Не удалось добавить сотрудника',
		text: 'Обновите страницу или попробуйте позже',
		iconPin: 'warningNotification',
		onCLick: onCLose,
	},
};

export const DeletedProfile: Story = {
	args: {
		title: 'Яблочкина Виктория',
		text: 'Данные пользователя успешно удалены',
		iconPin: 'success',
		onCLick: onCLose,
	},
};

export const SettingsSaved: Story = {
	args: {
		title: '',
		text: 'Настройки сохранены',
		iconPin: 'success',
		onCLick: onCLose,
	},
};
