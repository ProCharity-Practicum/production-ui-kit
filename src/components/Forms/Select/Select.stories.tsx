import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Select, SelectProps } from './Select';
import { useState } from 'react';

type Option = string | Record<string, unknown>;

const meta: Meta<typeof Select> = {
	title: 'Forms/Select',
	component: Select,
	parameters: {
		layout: 'centered',
	},
	args: {
		onChange: fn(),
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

// Обертка для управления состоянием в сторисах
const WithState = (props: SelectProps) => {
	const [value, setValue] = useState<Option | null>(props.value ?? null);
	return <Select {...props} value={value} onChange={setValue} />;
};

// Базовые сторисы с управлением состоянием
export const StringOptions: Story = {
	render: (args) => <WithState {...args} />,
	args: {
		label: 'Выберите вариант',
		options: ['Option 1', 'Option 2', 'Option 3'],
		name: 'string-select',
	},
};

export const ObjectOptions: Story = {
	render: (args) => <WithState {...args} />,
	args: {
		label: 'Выберите город',
		options: [
			{ id: '1', name: 'Москва' },
			{ id: '2', name: 'Санкт-Петербург' },
			{ id: '3', name: 'Казань' },
		],
		optionLabel: 'name',
		name: 'city-select',
	},
};

export const WithDefaultValue: Story = {
	render: (args) => <WithState {...args} />,
	args: {
		label: 'Выберите пользователя',
		options: [
			{ id: '1', username: 'Иван', email: 'ivan@test.com' },
			{ id: '2', username: 'Мария', email: 'maria@test.com' },
			{ id: '3', username: 'Алексей', email: 'alex@test.com' },
		],
		optionLabel: 'username',
		value: { id: '2', username: 'Мария', email: 'maria@test.com' },
		name: 'user-select',
	},
};

// Комплексная история с отображением состояния
export const ComplexObjectWithState: Story = {
	render: function Render(args) {
		const [selected, setSelected] = useState<Option | null>(null);

		const options: Option[] = [
			{
				id: '1',
				name: 'Проект 1',
				tags: ['важно', 'срочно'],
				team: ['Алексей', 'Мария'],
			},
			{
				id: '2',
				name: 'Проект 2',
				tags: ['разработка'],
				team: ['Иван', 'Ольга', 'Дмитрий'],
			},
		];

		const handleChange = (selectedOption: Option) => {
			setSelected(selectedOption);
		};

		return (
			<div style={{ width: '300px' }}>
				<Select
					{...args}
					options={options}
					optionLabel="name"
					value={selected}
					onChange={handleChange}
				/>

				{selected && typeof selected === 'object' && (
					<div
						style={{
							marginTop: '20px',
							padding: '16px',
							background: '#f5f5f5',
						}}
					>
						<h4>Выбранный проект:</h4>
						<pre>{JSON.stringify(selected, null, 2)}</pre>
					</div>
				)}
			</div>
		);
	},
	args: {
		label: 'Выберите проект',
	},
};

// Контейнеры для MultipleSelects
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

// История с несколькими селектами
export const MultipleSelects: Story = {
	render: function Render(args) {
		const [values, setValues] = useState<Record<string, Option | null>>({
			product: null,
			city: null,
			color: null,
			size: null,
			material: null,
		});

		const handleChange = (field: string) => (value: Option) => {
			setValues((prev) => ({ ...prev, [field]: value }));
		};

		return (
			<Container>
				<Select
					{...args}
					label="Продукт"
					options={[
						{ name: 'Ноутбук', value: 'laptop' },
						{ name: 'Смартфон', value: 'phone' },
						{ name: 'Планшет', value: 'tablet' },
					]}
					optionLabel="name"
					value={values.product}
					onChange={handleChange('product')}
				/>

				<Row>
					<Select
						label="Город"
						options={[
							{ title: 'Москва', value: 'moscow' },
							{ title: 'Санкт-Петербург', value: 'spb' },
							{ title: 'Казань', value: 'kazan' },
						]}
						optionLabel="title"
						value={values.city}
						onChange={handleChange('city')}
					/>
				</Row>

				<Row>
					<Select
						label="Цвет"
						options={['Красный', 'Синий', 'Зеленый']}
						value={values.color}
						onChange={handleChange('color')}
					/>
					<Select
						label="Размер"
						options={['S', 'M', 'L', 'XL']}
						value={values.size}
						onChange={handleChange('size')}
					/>
				</Row>

				<div style={{ width: '400px' }}>
					<Select
						label="Материал"
						options={['Хлопок', 'Полиэстер', 'Шерсть']}
						value={values.material}
						onChange={handleChange('material')}
					/>
				</div>

				<div
					style={{
						marginTop: '24px',
						padding: '16px',
						background: '#f5f5f5',
						borderRadius: '8px',
					}}
				>
					<h4>Текущие значения:</h4>
					<pre>{JSON.stringify(values, null, 2)}</pre>
				</div>
			</Container>
		);
	},
	args: {
		label: '',
		options: [],
	},
};

export const NativeFormSimulation: Story = {
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [selectedValue, setSelectedValue] = useState<Option | null>(null);

		const getSelectedValueText = (value: Option | null): string => {
			if (value === null) return 'ничего не выбрано';
			if (typeof value === 'string') return value;
			return JSON.stringify(value);
		};

		return (
			<div style={{ maxWidth: '500px', margin: '0 auto' }}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const formData = new FormData(e.currentTarget);
						alert(
							`Отправленные данные:\n${JSON.stringify(
								{
									option: formData.get('option'),
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

					<Select
						name="option"
						label="Выберите вариант"
						options={['Вариант 1', 'Вариант 2', 'Вариант 3']}
						value={selectedValue}
						onChange={setSelectedValue}
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
						<p>Выбранное значение: {getSelectedValueText(selectedValue)}</p>
					</div>
				</form>
			</div>
		);
	},
};
