import { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { useState } from 'react';
import { Button } from '../../Button';

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

export const WithCloseOnOverlayClick: Story = {
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [isOpen, setIsOpen] = useState(true);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true);

		return isOpen ? (
			<>
				<Modal
					onClose={() => setIsOpen(false)}
					closeOnOverlayClick={closeOnOverlayClick}
				>
					<div style={{ padding: '20px' }}>
						<h3>Тест закрытия по клику вне модалки</h3>
						<p>
							Текущий режим:{' '}
							{closeOnOverlayClick ? 'закрывается' : 'не закрывается'}
						</p>
						<Button
							onClick={() => setCloseOnOverlayClick(!closeOnOverlayClick)}
						>
							Переключить режим ({closeOnOverlayClick ? 'on' : 'off'})
						</Button>
					</div>
				</Modal>
			</>
		) : (
			<Button onClick={() => setIsOpen(true)}>Открыть модалку</Button>
		);
	},
};
