import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { SelectCategories } from './SelectCategories';
import { useState } from 'react';
import { CSSProperties } from 'react';
import {
	designCategories,
	marketingCategories,
	developmentCategories,
} from './selectCategories.mocks';

type MultipleOption = {
	title: string;
	values: string[];
};

type SelectCategoriesProps = {
	setInitialValues?: (values: string[]) => void;
	label: string;
	options: MultipleOption[];
	initialValues?: string[];
};

const meta = {
	title: 'Forms/Select/SelectCategories',
	component: SelectCategories,
	parameters: {
		layout: 'centered',
	},
	args: {
		label: designCategories.label,
		options: designCategories.options,
		initialValues: [],
		setInitialValues: () => {},
	} as SelectCategoriesProps,
} satisfies Meta<typeof SelectCategories>;

export default meta;
type Story = StoryObj<typeof meta>;

// Базовый стиль для всех контейнеров
const baseContainerStyle: CSSProperties = {
	padding: '20px',
	border: '1px dashed #ccc',
	borderRadius: '8px',
	marginBottom: '24px',
	textAlign: 'left', // Выравнивание по левому краю
};

// Стили для конкретных контейнеров
const container750Style: CSSProperties = {
	...baseContainerStyle,
	width: '736px',
};

const container600Style: CSSProperties = {
	...baseContainerStyle,
	width: '511px',
};

const container450Style: CSSProperties = {
	...baseContainerStyle,
	width: '312px',
	marginBottom: '0',
};

// Стиль для общего контейнера
const wrapperStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start', // Выравниваем по левому краю
	gap: '16px',
	maxWidth: '100%',
	padding: '20px',
};

// Стиль для подписи контейнера
const containerLabelStyle: CSSProperties = {
	fontWeight: 'bold',
	marginBottom: '12px',
	color: '#666',
	fontSize: '14px',
};

export const Default: Story = {
	args: {
		label: designCategories.label,
		options: designCategories.options,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByTestId('SelectCategories')).toBeInTheDocument();
	},
};

export const MultipleContainers: Story = {
	render: (args) => {
		// Состояния для каждого селекта
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [designValues, setDesignValues] = useState([
			'Разработка логотипов и фирменного стиля',
		]);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [marketingValues, setMarketingValues] = useState([
			'SEO-оптимизация и техническая поддержка',
		]);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [devValues, setDevValues] = useState([
			'Разработка на React с TypeScript',
		]);

		return (
			<div style={wrapperStyle}>
				{/* Контейнер 736px */}
				<div style={container750Style}>
					<div style={containerLabelStyle}>Контейнер 736px</div>
					<SelectCategories
						{...args}
						label={designCategories.label}
						options={designCategories.options}
						initialValues={designValues}
						setInitialValues={setDesignValues}
					/>
				</div>

				{/* Контейнер 511px */}
				<div style={container600Style}>
					<div style={containerLabelStyle}>Контейнер 511px</div>
					<SelectCategories
						{...args}
						label={marketingCategories.label}
						options={marketingCategories.options}
						initialValues={marketingValues}
						setInitialValues={setMarketingValues}
					/>
				</div>

				{/* Контейнер 312px */}
				<div style={container450Style}>
					<div style={containerLabelStyle}>Контейнер 312px</div>
					<SelectCategories
						{...args}
						label={developmentCategories.label}
						options={developmentCategories.options}
						initialValues={devValues}
						setInitialValues={setDevValues}
					/>
				</div>
			</div>
		);
	},
	args: {
		label: '',
		options: [],
		initialValues: [],
		setInitialValues: () => {},
	},
	parameters: {
		viewport: {
			defaultViewport: 'responsive',
		},
	},
};

export const NativeFormSimulation: Story = {
	render: () => {
		// Имитируем состояние формы
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [selectedValues, setSelectedValues] = useState<string[]>([]);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [username, setUsername] = useState('');
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [formSubmitted, setFormSubmitted] = useState(false);

		const handleSubmit = (e: React.FormEvent) => {
			e.preventDefault();
			setFormSubmitted(true);
		};

		const handleReset = () => {
			setSelectedValues([]);
			setUsername('');
			setFormSubmitted(false);
		};

		return (
			<div style={{ maxWidth: '500px', margin: '0 auto' }}>
				<form
					onSubmit={handleSubmit}
					onReset={handleReset}
					style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
				>
					<h3>Имитация работы формы</h3>

					{/* Наш компонент с привязкой к состоянию */}
					<SelectCategories
						name="skills"
						label="Выберите навыки"
						options={designCategories.options}
						initialValues={selectedValues}
						setInitialValues={setSelectedValues}
					/>

					<input
						type="text"
						name="username"
						placeholder="Ваше имя"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>

					<div>
						<button type="submit">Отправить</button>
						<button type="reset" style={{ marginLeft: '10px' }}>
							Сбросить
						</button>
					</div>
				</form>

				{formSubmitted && (
					<div
						style={{
							marginTop: '20px',
							padding: '15px',
							background: '#f5f5f5',
						}}
					>
						<h4>Имитация данных формы:</h4>
						<pre>
							{JSON.stringify(
								{
									skills: selectedValues,
									username,
								},
								null,
								2
							)}
						</pre>
					</div>
				)}

				<div
					style={{ marginTop: '20px', padding: '15px', background: '#fff8e1' }}
				>
					<h4>Текущее состояние:</h4>
					<p>Выбрано навыков: {selectedValues.length}</p>
					{selectedValues.length > 0 && (
						<ul>
							{selectedValues.map((value) => (
								<li key={value}>{value}</li>
							))}
						</ul>
					)}
				</div>
			</div>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Проверяем начальное состояние
		await expect(canvas.getByText('Выбрано навыков: 0')).toBeInTheDocument();

		// Можно добавить тесты для взаимодействия
	},
};
