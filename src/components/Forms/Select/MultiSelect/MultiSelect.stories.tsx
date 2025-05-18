import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { MultiSelect } from './MultiSelect';
import { useState } from 'react';

type Option = string | Record<string, unknown>;

const meta: Meta<typeof MultiSelect> = {
	title: 'Forms/Select/MultiSelect',
	component: MultiSelect,
	parameters: {
		layout: 'centered',
	},
	args: {
		onChange: fn(),
	},
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof MultiSelect>;

// Обертка для управления состоянием в сторисах
const WithState = (props: React.ComponentProps<typeof MultiSelect>) => {
	const [value, setValue] = useState<Option[]>(props.value ?? []);
	return <MultiSelect {...props} value={value} onChange={setValue} />;
};

// Базовые сторисы с управлением состоянием
export const StringOptions: Story = {
	render: (args) => <WithState {...args} />,
	args: {
		label: 'Выберите варианты',
		options: ['Option 1', 'Option 2', 'Option 3'],
		name: 'multi-string-select',
	},
};

export const ObjectOptions: Story = {
	render: (args) => <WithState {...args} />,
	args: {
		label: 'Выберите города',
		options: [
			{ id: '1', name: 'Москва' },
			{ id: '2', name: 'Санкт-Петербург' },
			{ id: '3', name: 'Казань' },
		],
		optionLabel: 'name',
		name: 'multi-city-select',
	},
};

export const WithDefaultValues: Story = {
	render: (args) => <WithState {...args} />,
	args: {
		label: 'Выберите пользователей',
		options: [
			{ id: '1', username: 'Иван', email: 'ivan@test.com' },
			{ id: '2', username: 'Мария', email: 'maria@test.com' },
			{ id: '3', username: 'Алексей', email: 'alex@test.com' },
		],
		optionLabel: 'username',
		value: [{ id: '2', username: 'Мария', email: 'maria@test.com' }],
		name: 'multi-user-select',
	},
};

// Комплексная история с отображением состояния
export const ComplexObjectWithState: Story = {
	render: function Render(args) {
		const [selected, setSelected] = useState<Option[]>([]);

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

		const handleChange = (selectedOptions: Option[]) => {
			setSelected(selectedOptions);
		};

		return (
			<div style={{ width: '300px' }}>
				<MultiSelect
					{...args}
					options={options}
					optionLabel="name"
					value={selected}
					onChange={handleChange}
				/>

				{selected.length > 0 && (
					<div
						style={{
							marginTop: '20px',
							padding: '16px',
							background: '#f5f5f5',
						}}
					>
						<h4>Выбранные проекты:</h4>
						<pre>{JSON.stringify(selected, null, 2)}</pre>
					</div>
				)}
			</div>
		);
	},
	args: {
		label: 'Выберите проекты',
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

// История с несколькими мультиселектами
export const MultipleMultiSelects: Story = {
	render: function Render(args) {
		const [values, setValues] = useState<Record<string, Option[]>>({
			products: [],
			cities: [],
			colors: [],
		});

		const handleChange = (field: string) => (value: Option[]) => {
			setValues((prev) => ({ ...prev, [field]: value }));
		};

		return (
			<Container>
				<MultiSelect
					{...args}
					label="Продукты"
					options={[
						{ name: 'Ноутбук', value: 'laptop' },
						{ name: 'Смартфон', value: 'phone' },
						{ name: 'Планшет', value: 'tablet' },
					]}
					optionLabel="name"
					value={values.products}
					onChange={handleChange('products')}
				/>

				<Row>
					<MultiSelect
						label="Города"
						options={[
							{ title: 'Москва', value: 'moscow' },
							{ title: 'Санкт-Петербург', value: 'spb' },
							{ title: 'Казань', value: 'kazan' },
						]}
						optionLabel="title"
						value={values.cities}
						onChange={handleChange('cities')}
					/>
				</Row>

				<div style={{ width: '400px' }}>
					<MultiSelect
						label="Цвета"
						options={['Красный', 'Синий', 'Зеленый']}
						value={values.colors}
						onChange={handleChange('colors')}
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
		const [selectedValues, setSelectedValues] = useState<Option[]>([]);

		const getSelectedValuesText = (values: Option[]): string => {
			if (values.length === 0) return 'ничего не выбрано';
			return values
				.map((v) => (typeof v === 'string' ? v : JSON.stringify(v)))
				.join(', ');
		};

		return (
			<div style={{ maxWidth: '500px', margin: '0 auto' }}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const formData = new FormData(e.currentTarget);
						const selected = formData.getAll('options');
						alert(
							`Отправленные данные:\n${JSON.stringify(
								{
									options: selected,
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

					<MultiSelect
						name="options"
						label="Выберите варианты"
						options={['Вариант 1', 'Вариант 2', 'Вариант 3']}
						value={selectedValues}
						onChange={setSelectedValues}
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
						<p>Выбранные значения: {getSelectedValuesText(selectedValues)}</p>
					</div>
				</form>
			</div>
		);
	},
};
