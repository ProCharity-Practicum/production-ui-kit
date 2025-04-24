import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from '@storybook/test';
import { useState } from 'react';
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
		// Используем обертку для управления состоянием
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [checked, setChecked] = useState(args.checked);
		return (
			<Checkbox
				{...args}
				checked={checked}
				onChange={(newChecked) => {
					setChecked(newChecked);
					args.onChange?.(newChecked);
				}}
			/>
		);
	},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonPlay = async (canvasElement: HTMLElement) => {
	const canvas = within(canvasElement);
	const checkbox = canvas.getByTestId('checkbox');
	const text = canvas.getByTestId('checkbox-text');
	await expect(checkbox).toBeInTheDocument();
	await expect(text).toBeInTheDocument();
};

export const MinistryCheckbox: Story = {
	args: {
		variant: 'Ministry',
	},
	play: async ({ canvasElement }) => {
		await commonPlay(canvasElement);
		const canvas = within(canvasElement);
		const checkbox = canvas.getByTestId('checkbox');
		await userEvent.click(checkbox);
		await expect(checkbox).toBeChecked();
	},
};

export const SiteRulesCheckbox: Story = {
	args: {
		variant: 'SiteRules',
	},
	play: async ({ canvasElement }) => {
		await commonPlay(canvasElement);
	},
};

export const ReviewCheckbox: Story = {
	args: {
		variant: 'Review',
	},
	play: async ({ canvasElement }) => {
		await commonPlay(canvasElement);
	},
};

export const MaterialsCheckbox: Story = {
	args: {
		variant: 'Materials',
	},
	play: async ({ canvasElement }) => {
		await commonPlay(canvasElement);
	},
};

export const AdminCheckbox: Story = {
	args: {
		variant: 'Admin',
	},
	play: async ({ canvasElement }) => {
		await commonPlay(canvasElement);
	},
};

export const CustomTextCheckbox: Story = {
	args: {
		children: <span>Кастомный текст чекбокса</span>,
	},
	play: async ({ canvasElement }) => {
		await commonPlay(canvasElement);
	},
};

export const NativeFormTest: Story = {
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [consentChecked, setConsentChecked] = useState(false);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [newsletterChecked, setNewsletterChecked] = useState(false);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [lastSubmission, setLastSubmission] = useState<string | null>(null);

		return (
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const data = new FormData(e.currentTarget);
					setLastSubmission(
						JSON.stringify(
							{
								consent: data.get('consent') || 'off',
								newsletter: data.get('newsletter') || 'off',
							},
							null,
							2
						)
					);
				}}
				style={{ display: 'grid', gap: '16px', width: '300px' }}
			>
				<Checkbox
					name="consent"
					variant="SiteRules"
					checked={consentChecked}
					onChange={setConsentChecked}
					required
				/>
				<Checkbox
					name="newsletter"
					variant="NoNewTasks"
					checked={newsletterChecked}
					onChange={setNewsletterChecked}
				/>
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
						<p>Отправленные данные:</p>
						<pre>{lastSubmission}</pre>
						<p>Текущие состояния:</p>
						<ul>
							<li>Согласие: {consentChecked.toString()}</li>
							<li>Рассылка: {newsletterChecked.toString()}</li>
						</ul>
					</div>
				)}
			</form>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const consentCheckbox = canvas.getByLabelText(
			/Соглашаюсь с правилами сайта/i
		);
		const submitButton = canvas.getByText('Отправить');

		// Первая попытка отправки без согласия
		await userEvent.click(submitButton);

		// Отмечаем чекбокс согласия
		await userEvent.click(consentCheckbox);
		await expect(consentCheckbox).toBeChecked();

		// Успешная отправка
		await userEvent.click(submitButton);
	},
};
