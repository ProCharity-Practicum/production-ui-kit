import { Meta, StoryObj } from '@storybook/react';
import { ModalConfirm } from './ModalConfirm';

const meta = {
	title: 'Common/Layout/ModalConfirm',
	component: ModalConfirm,
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
} satisfies Meta<typeof ModalConfirm>;

export default meta;

type Story = StoryObj<typeof ModalConfirm>;
const onTransition = () => {
	alert('Закрытие модального окна');
};

export const Default: Story = {
	args: {
		title: 'Удалить данные сотрудника?',
		children: <div>Данные о сотруднике Яковлев Анатолий будут удалены</div>,
		onConfirm: onTransition,
		text: 'Удалить',
	},
};
