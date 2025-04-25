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
	onChange?: (values: string[]) => void;
	label: string;
	options: MultipleOption[];
	value?: string[];
	name?: string;
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
		value: [], // Изменено с initialValues
		onChange: () => {}, // Изменено с setInitialValues
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
	render: (args) => {
		// Добавляем состояние для дефолтной стори
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [values, setValues] = useState<string[]>([]);

		return <SelectCategories {...args} value={values} onChange={setValues} />;
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
						value={designValues}
						onChange={setDesignValues}
					/>
				</div>

				{/* Контейнер 511px */}
				<div style={container600Style}>
					<div style={containerLabelStyle}>Контейнер 511px</div>
					<SelectCategories
						{...args}
						label={marketingCategories.label}
						options={marketingCategories.options}
						value={marketingValues}
						onChange={setMarketingValues}
					/>
				</div>

				{/* Контейнер 312px */}
				<div style={container450Style}>
					<div style={containerLabelStyle}>Контейнер 312px</div>
					<SelectCategories
						{...args}
						label={developmentCategories.label}
						options={developmentCategories.options}
						value={devValues}
						onChange={setDevValues}
					/>
				</div>
			</div>
		);
	},
	args: {
		label: '',
		options: [],
		value: [],
		onChange: () => {},
	},
	parameters: {
		viewport: {
			defaultViewport: 'responsive',
		},
	},
};

export const NativeFormSimulation: Story = {
	render: () => {
		// Минимальное состояние только для SelectCategories
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [skills, setSkills] = useState<string[]>([]);

		return (
			<div style={{ maxWidth: '500px', margin: '0 auto' }}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const formData = new FormData(e.currentTarget);
						alert(
							`Отправленные данные:\n${JSON.stringify(
								{
									skills: formData.getAll('skills'),
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

					{/* SelectCategories с привязкой к состоянию */}
					<SelectCategories
						name="skills"
						label="Выберите навыки"
						options={designCategories.options}
						value={skills}
						onChange={setSkills}
					/>

					<input type="text" name="username" placeholder="Ваше имя" required />

					<button type="submit">Отправить</button>

					{/* Блок для визуализации выбранных значений */}
					<div
						style={{
							marginTop: '16px',
							padding: '12px',
							background: '#f5f5f5',
							borderRadius: '4px',
						}}
					>
						<p>
							Выбранные навыки:{' '}
							{skills.length ? skills.join(', ') : 'ничего не выбрано'}
						</p>
					</div>
				</form>
			</div>
		);
	},
};
