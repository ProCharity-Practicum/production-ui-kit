import type { Meta, StoryObj } from '@storybook/react';
import SelectAvatar from '.';
import defaultAvatar from '../../../../assets/images/img_chess_512.png';

const meta: Meta<typeof SelectAvatar> = {
	title: 'Common/Content/User/SelectAvatar',
	component: SelectAvatar,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {
		// Добавляем mock-функции по умолчанию для всех историй
		onChangeAvatar: (newAvatar: string) =>
			console.log('Avatar changed to:', newAvatar),
		onDeleteAvatar: async () => {
			console.log('Avatar delete requested');
			await new Promise((resolve) => setTimeout(resolve, 100)); // Имитация асинхронной операции
			return { ok: true };
		},
	},
};

export default meta;

type Story = StoryObj<typeof SelectAvatar>;

export const Default: Story = {
	args: {}, // Использует mock-функции из meta
};

export const WithImage: Story = {
	args: {
		avatar: defaultAvatar, // Добавляем avatar, остальные пропсы берутся из meta
	},
};
