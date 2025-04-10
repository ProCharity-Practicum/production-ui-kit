import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { Select } from './Select';

const meta = {
	title: 'Forms/Select',
	component: Select,
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// Базовая история
export const Default: Story = {
	args: {
		options: ['chocolate', 'strawberry', 'vanilla'],
		label: 'Выберите',
		onChange: fn(),
		name: 'defaultSelect', // Добавляем name
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Select');
		await expect(element).toBeInTheDocument();
	},
};

// История с предвыбранным значением
export const HasValue: Story = {
	args: {
		options: ['chocolate', 'strawberry', 'vanilla'],
		label: 'Выберите',
		onChange: fn(),
		value: 'chocolate',
		name: 'hasValueSelect', // Добавляем name
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Select');
		await expect(element).toBeInTheDocument();
	},
};

// Интерактивный пример
export const InteractiveExample: Story = {
	name: 'Интерактивный пример',
	args: {
		options: ['chocolate', 'strawberry', 'vanilla'],
		label: 'Выберите',
		onChange: fn(),
		name: 'interactiveSelect', // Добавляем name
	},
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [value, setValue] = useState(args.value || '');
		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
				<Select
					{...args}
					value={value}
					onChange={(val, name) => {
						args.onChange?.(val, name); // Передаем в actions
						setValue(val);
					}}
				/>
				<div>
					Текущее значение: <strong>{value || 'не выбрано'}</strong>
				</div>
			</div>
		);
	},
};

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		style={{
			maxWidth: '800px',
			padding: '20px',
			background: '#fff',
			borderRadius: '8px',
		}}
	>
		{children}
	</div>
);

// Группа из двух селектов в ряд
const Row = ({ children }: { children: React.ReactNode }) => (
	<div
		style={{
			display: 'flex',
			gap: '16px',
			marginTop: '16px',
			marginBottom: '16px',
		}}
	>
		{children}
	</div>
);

export const MultipleSelects: StoryObj<typeof Select> = {
	args: {
		onChange: fn(),
	},
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [values, setValues] = useState({
			main: '',
			color: '',
			size: '',
			material: '',
			country: '',
			additional: '',
		});

		const handleChange =
			(field: keyof typeof values) => (value: string, name?: string) => {
				args.onChange?.(value, name); // Логируем в actions
				setValues((prev) => ({ ...prev, [field]: value }));
			};

		return (
			<Container>
				{/* Полноширинный селект */}
				<Select
					label="Основной выбор"
					options={['Вариант 1', 'Вариант 2', 'Вариант 3', 'Вариант 4']}
					value=""
					onChange={handleChange('main')}
					name="mainSelect"
				/>

				{/* Два селекта в ряд */}
				<Row>
					<Select
						label="Цвет"
						options={['Красный', 'Зеленый', 'Синий', 'Желтый']}
						value=""
						onChange={handleChange('color')}
						name="colorSelect"
					/>
					<Select
						label="Размер"
						options={['S', 'M', 'L', 'XL']}
						value=""
						onChange={handleChange('size')}
						name="sizeSelect"
					/>
				</Row>

				{/* Еще два селекта в ряд */}
				<Row>
					<Select
						label="Материал"
						options={['Хлопок', 'Полиэстер', 'Шерсть', 'Шелк']}
						value=""
						onChange={handleChange('material')}
						name="materialSelect"
					/>
					<Select
						label="Страна"
						options={['Россия', 'Китай', 'Турция', 'Германия']}
						value=""
						onChange={handleChange('country')}
						name="countrySelect"
					/>
				</Row>

				{/* Одиночный селект с ограниченной шириной */}
				<div style={{ width: '333px' }}>
					<Select
						label="Доп. параметр"
						options={['Да', 'Нет', 'Не важно']}
						value=""
						onChange={handleChange('additional')}
						name="additionalSelect"
					/>
				</div>
				{/* Блок с текущими значениями для наглядности */}
				<div
					style={{
						marginTop: '24px',
						padding: '16px',
						background: '#f5f5f5',
						borderRadius: '4px',
					}}
				>
					<h4>Текущие значения:</h4>
					<pre>{JSON.stringify(values, null, 2)}</pre>
				</div>
			</Container>
		);
	},
};
