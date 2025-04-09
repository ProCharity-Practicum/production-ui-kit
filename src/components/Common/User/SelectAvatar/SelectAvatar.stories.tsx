import type { Meta, StoryObj } from '@storybook/react';
import SelectAvatar from '.';
import defaultAvatar from '../../../../assets/images/img_chess_512.png';

const meta: Meta<typeof SelectAvatar> = {
	title: 'Form/SelectAvatar',
	component: SelectAvatar,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {},
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
