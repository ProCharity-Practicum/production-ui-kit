import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from '@storybook/test';
import { useState, ChangeEvent } from 'react';
import { Checkbox } from './Checkbox';

const meta = {
	title: 'Forms/Checkbox',
	component: Checkbox,
	parameters: {
		layout: 'centered',
	},
	args: {
		checked: false,
		onChange: () => {},
	},
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [checked, setChecked] = useState(args.checked);
		return (
			<Checkbox
				{...args}
				checked={checked}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					setChecked(e.target.checked);
					args.onChange?.(e);
				}}
			/>
		);
	},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonPlay = async (canvasElement: HTMLElement) => {
	const canvas = within(canvasElement);
	const checkbox = canvas.getByRole('checkbox');
	await expect(checkbox).toBeInTheDocument();
};

export const Basic: Story = {
	args: {
		children: 'Базовый чекбокс',
	},
	play: async ({ canvasElement }) => {
		await commonPlay(canvasElement);
		const canvas = within(canvasElement);
		const checkbox = canvas.getByRole('checkbox');
		await userEvent.click(checkbox);
		await expect(checkbox).toBeChecked();
	},
};

export const WithLink: Story = {
	args: {
		children: (
			<>
				Соглашаюсь с <a href="/terms">условиями</a>
			</>
		),
	},
	play: async ({ canvasElement }) => {
		await commonPlay(canvasElement);
	},
};

export const Disabled: Story = {
	args: {
		children: 'Отключённый чекбокс',
		disabled: true,
	},
	play: async ({ canvasElement }) => {
		await commonPlay(canvasElement);
		const canvas = within(canvasElement);
		const checkbox = canvas.getByRole('checkbox');
		await expect(checkbox).toBeDisabled();
	},
};

export const Required: Story = {
	args: {
		children: 'Обязательный чекбокс',
		required: true,
	},
	play: async ({ canvasElement }) => {
		await commonPlay(canvasElement);
		const canvas = within(canvasElement);
		const checkbox = canvas.getByRole('checkbox');
		await expect(checkbox).toBeRequired();
	},
};

export const MultilineText: Story = {
	args: {
		children: (
			<div style={{ display: 'grid', gap: '4px' }}>
				<div>Я согласен со следующими условиями:</div>
				<ul style={{ margin: 0, paddingLeft: '20px' }}>
					<li>Пользовательское соглашение</li>
					<li>Политика конфиденциальности</li>
					<li>Условия обработки персональных данных</li>
				</ul>
				<div style={{ fontSize: '0.8em', color: '#666' }}>
					Нажимая на кнопку, вы принимаете все перечисленные условия
				</div>
			</div>
		),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const checkbox = canvas.getByRole('checkbox');
		const listItems = canvas.getAllByRole('listitem');

		await expect(checkbox).toBeInTheDocument();
		await expect(listItems).toHaveLength(3);

		// Кликаем по тексту (не по самому чекбоксу)
		const text = canvas.getByText(/Я согласен со следующими условиями/i);
		await userEvent.click(text);
		await expect(checkbox).toBeChecked();
	},
};

export const NativeFormTest: Story = {
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [lastSubmission, setLastSubmission] = useState<string | null>(null);

		const handleSubmit = (e: React.FormEvent) => {
			e.preventDefault();
			const formData = new FormData(e.currentTarget as HTMLFormElement);
			setLastSubmission(
				JSON.stringify(
					{
						consent: formData.get('consent') === 'on',
						newsletter: formData.get('newsletter') === 'on',
					},
					null,
					2
				)
			);
		};

		return (
			<form
				onSubmit={handleSubmit}
				style={{ display: 'grid', gap: '16px', width: '300px' }}
			>
				<Checkbox name="consent" required>
					Я согласен с условиями
				</Checkbox>

				<Checkbox name="newsletter">Подписаться на рассылку</Checkbox>

				<button type="submit">Отправить</button>

				{lastSubmission && (
					<div
						style={{
							padding: '12px',
							background: '#f5f5f5',
							borderRadius: '4px',
							fontFamily: 'monospace',
						}}
					>
						<pre>Form data: {lastSubmission}</pre>
					</div>
				)}
			</form>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const consentCheckbox = canvas.getByLabelText(/Я согласен с условиями/i);
		const submitButton = canvas.getByText('Отправить');

		// Первая попытка отправки без согласия
		await userEvent.click(submitButton);
		await expect(consentCheckbox).toBeInvalid();

		// Отмечаем чекбокс согласия
		await userEvent.click(consentCheckbox);
		await expect(consentCheckbox).toBeChecked();

		// Успешная отправка
		await userEvent.click(submitButton);
		await expect(canvas.getByText(/Form data:/i)).toBeInTheDocument();
	},
};
