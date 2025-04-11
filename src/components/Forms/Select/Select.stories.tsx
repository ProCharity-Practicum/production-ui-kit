import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Select } from './Select';
import { useState } from 'react';

const meta = {
	title: 'Forms/Select',
	component: Select,
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultWithStrings: Story = {
	args: {
		label: 'Выберите вариант',
		options: ['Первый', 'Второй', 'Третий'], // Простые строки
		optionLabel: 'anyField', // Любое значение, т.к. для строк игнорируется
		onChange: fn(),
		name: 'stringSelect',
	},
};

// 2. Вариант с объектами
export const ObjectOptions: Story = {
	args: {
		label: 'Выберите город',
		options: [
			{ name: 'Москва', value: 'moscow' },
			{ name: 'Санкт-Петербург', value: 'spb' },
			{ name: 'Казань', value: 'kazan' },
		],
		optionLabel: 'name', // Указываем поле для отображения
		onChange: fn(),
		name: 'citySelect',
	},
};

// 3.1 Вариант с предвыбранным значением (строки)
export const StringOptionsWithDefault: Story = {
	args: {
		label: 'Выберите напиток',
		options: ['Кофе', 'Чай', 'Сок'],
		optionLabel: 'anyField',
		value: 'Чай', // Предвыбранное значение (должно совпадать с одним из элементов массива)
		onChange: fn(),
		name: 'drinkSelect',
	},
};

// 3.2 Вариант с предвыбранным значением (для объектов)
export const ObjectOptionsWithDefault: Story = {
	args: {
		label: 'Выберите пользователя',
		options: [
			{ username: 'Иван', id: 'user1' },
			{ username: 'Мария', id: 'user2' },
			{ username: 'Алексей', id: 'user3' },
		],
		optionLabel: 'username',
		value: 'user2', // Предвыбранное значение (id)
		onChange: fn(),
		name: 'userSelect',
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

const Row = ({ children }: { children: React.ReactNode }) => (
	<div style={{ display: 'flex', gap: '16px', margin: '16px 0' }}>
		{children}
	</div>
);

export const MultipleSelects: Story = {
	args: {
		label: '', // Пустые значения по умолчанию
		options: [],
		optionLabel: '',
		onChange: fn(),
	},
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [values, setValues] = useState({
			product: '',
			city: '',
			color: '',
			size: '',
			material: '',
		});

		const handleChange = (field: keyof typeof values) => (value: string) => {
			setValues((prev) => ({ ...prev, [field]: value }));
		};

		return (
			<Container>
				{/* 1. Селект с объектами (продукты) */}
				<Select
					label="Продукт"
					options={[
						{ name: 'Ноутбук', value: 'laptop' },
						{ name: 'Смартфон', value: 'phone' },
						{ name: 'Планшет', value: 'tablet' },
					]}
					optionLabel="name"
					value={values.product}
					onChange={handleChange('product')}
					name="productSelect"
				/>

				{/* 2. Селект со строками (цвета) */}
				<Row>
					<Select
						label="Цвет"
						options={['Красный', 'Синий', 'Зеленый']}
						optionLabel="any"
						value={values.color}
						onChange={handleChange('color')}
						name="colorSelect"
					/>

					{/* 3. Селект со строками (размеры) */}
					<Select
						label="Размер"
						options={['S', 'M', 'L', 'XL']}
						optionLabel="any"
						value={values.size}
						onChange={handleChange('size')}
						name="sizeSelect"
					/>
				</Row>

				{/* 4. Селект со строками (материалы) */}
				<div style={{ width: '400px' }}>
					<Select
						label="Материал"
						options={['Хлопок', 'Полиэстер', 'Шерсть']}
						optionLabel="any"
						value={values.material}
						onChange={handleChange('material')}
						name="materialSelect"
					/>
				</div>

				{/* Блок с текущими значениями */}
				<div
					style={{
						marginTop: '24px',
						padding: '16px',
						background: '#f5f5f5',
						borderRadius: '4px',
						fontFamily: 'monospace',
					}}
				>
					<h4>Текущие значения:</h4>
					<pre>{JSON.stringify(values, null, 2)}</pre>
				</div>
			</Container>
		);
	},
};
