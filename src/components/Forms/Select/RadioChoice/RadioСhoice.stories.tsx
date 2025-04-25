import { Meta, StoryObj } from '@storybook/react';
import { RadioChoice } from './RadioChoice';
import { useState } from 'react';

const meta = {
	title: 'Forms/Select/RadioChoice',
	component: RadioChoice,
	tags: ['autodocs'],
	args: {},
	argTypes: {
		state: {
			options: ['selectors', 'rates', 'rates_buttonLike'],
			control: { type: 'radio' },
		},
		onChange: {
			action: 'onChange',
			description: 'returns the currently selected value',
		},
	},
} satisfies Meta<typeof RadioChoice>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Selectors: Story = {
	args: {
		state: 'selectors',
		array: [
			{ title: 'я частное лицо', value: 'person' },
			{ title: 'я представляю компанию', value: 'company' },
		],
		name: 'userType',
		isButtonLike: false,
		selected: 'person',
	},
};

export const Rates: Story = {
	args: {
		state: 'rates',
		array: [
			{ title: '1', value: '1' },
			{ title: '2', value: '2' },
			{ title: '3', value: '3' },
			{ title: '4', value: '4' },
			{ title: '5', value: '5' },
		],
		name: 'rating',
		isButtonLike: false,
		selected: '5',
	},
};

export const NativeFormSimulation: Story = {
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [selectedValue, setSelectedValue] = useState<string>('person');

		return (
			<div style={{ maxWidth: '500px', margin: '0 auto' }}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const formData = new FormData(e.currentTarget);
						alert(
							`Отправленные данные:\n${JSON.stringify(
								{
									userType: formData.get('userType'),
									username: formData.get('username'),
								},
								null,
								2
							)}`
						);
					}}
					style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
				>
					<h3>Демонстрация работы с нативной формой</h3>

					<RadioChoice
						name="userType"
						array={[
							{ title: 'я частное лицо', value: 'person' },
							{ title: 'я представляю компанию', value: 'company' },
						]}
						selected={selectedValue}
						onChange={setSelectedValue}
						state="selectors"
					/>

					<input type="text" name="username" placeholder="Ваше имя" required />

					<button type="submit">Отправить</button>

					<div
						style={{
							marginTop: '16px',
							padding: '12px',
							background: '#f5f5f5',
							borderRadius: '4px',
						}}
					>
						<p>Выбранное значение: {selectedValue}</p>
					</div>
				</form>
			</div>
		);
	},
};

export const RatesInNativeForm: Story = {
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [selectedRate, setSelectedRate] = useState('');

		return (
			<div style={{ maxWidth: '500px', margin: '0 auto' }}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const formData = new FormData(e.currentTarget);
						alert(
							`Отправленные данные:\n${JSON.stringify(
								{
									rating: formData.get('rating'),
									feedback: formData.get('feedback'),
								},
								null,
								2
							)}`
						);
					}}
					style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
				>
					<h3>Оцените наш сервис</h3>

					<RadioChoice
						name="rating"
						array={[
							{ title: '1', value: '1' },
							{ title: '2', value: '2' },
							{ title: '3', value: '3' },
							{ title: '4', value: '4' },
							{ title: '5', value: '5' },
						]}
						selected={selectedRate}
						onChange={setSelectedRate}
						state="rates"
					/>

					<textarea
						name="feedback"
						placeholder="Ваш отзыв (необязательно)"
						rows={3}
					/>

					<button type="submit">Отправить оценку</button>

					<div
						style={{
							marginTop: '16px',
							padding: '12px',
							background: '#f5f5f5',
							borderRadius: '4px',
						}}
					>
						<p>Текущая оценка: {selectedRate}</p>
					</div>
				</form>
			</div>
		);
	},
};
