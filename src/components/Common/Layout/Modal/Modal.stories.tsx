import { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta = {
	title: 'Common/Layout/Modal',
	component: Modal,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div style={{ minWidth: '800px', minHeight: '800px' }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof Modal>;
const onTransition = () => {
	alert('Закрытие модального окна');
};

export const Default: Story = {
	args: {
		children: <div>Причина удаления задачи</div>,
		onClose: onTransition,
	},
};
