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
		onChangeAvatar: (newAvatar: string) =>
			console.log('Avatar changed to:', newAvatar),
		onDeleteAvatar: async () => {
			console.log('Avatar delete requested');
			await new Promise((resolve) => setTimeout(resolve, 100));
			return { ok: true };
		},
	},
	argTypes: {
		variant: {
			control: 'radio',
			options: ['volunteer', 'nko'],
			description: 'Вариант отображения (волонтеры/нко)',
		},
	},
};

export default meta;

type Story = StoryObj<typeof SelectAvatar>;

export const Default: Story = {
	args: {},
};

export const WithImage: Story = {
	args: {
		avatar: defaultAvatar,
	},
};

export const VolunteerDefault: Story = {
	args: {
		variant: 'volunteer',
	},
	name: 'Волонтеры (по умолчанию)',
};

export const VolunteerWithImage: Story = {
	args: {
		variant: 'volunteer',
		avatar: defaultAvatar,
	},
	name: 'Волонтеры с изображением',
};

export const NKODefault: Story = {
	args: {
		variant: 'nko',
	},
	name: 'НКО (по умолчанию)',
};

export const NKOWithImage: Story = {
	args: {
		variant: 'nko',
		avatar: defaultAvatar,
	},
	name: 'НКО с изображением',
};

export const Playground: Story = {
	args: {
		variant: 'volunteer',
		avatar: defaultAvatar,
	},
	name: 'Playground (интерактивный пример)',
	parameters: {
		docs: {
			canvas: {
				sourceState: 'shown',
			},
		},
	},
};
