import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { HelpSelector } from './HelpSelector';
import { useState } from 'react';
import { CSSProperties } from 'react';

// Моковые данные для категорий (Чем помочь)
const skillCategories = {
	label: 'Чем помочь',
	options: [
		{
			title: 'Дизайн',
			values: [
				'Разработка логотипов',
				'Фирменный стиль',
				'UI/UX дизайн',
				'Графический дизайн',
			],
		},
		{
			title: 'Разработка',
			values: [
				'Веб-разработка',
				'Мобильные приложения',
				'Тестирование',
				'DevOps',
			],
		},
		{
			title: 'Маркетинг',
			values: ['SMM', 'Контент-маркетинг', 'SEO', 'Таргетированная реклама'],
		},
	],
};

// Моковые данные для фондов (Кому помочь)
const fundCategories = {
	label: 'Кому помочь',
	options: [
		{
			title: 'Фонды',
			values: [
				'Фонд "Помоги детям"',
				'Приют "Друзья животных"',
				'Эко-фонд "Чистая планета"',
				'Благотворительный фонд "Рука помощи"',
				'Фонд "Защита природы"',
				'Центр помощи бездомным',
			],
		},
	],
};

type MultipleOption = {
	title: string;
	values: string[];
};

type HelpSelectorProps = {
	setInitialValues?: (values: string[]) => void;
	label: string;
	options: MultipleOption[];
	initialValues?: string[];
};

const meta = {
	title: 'Forms/Select/HelpSelector',
	component: HelpSelector,
	parameters: {
		layout: 'centered',
	},
	args: {
		label: skillCategories.label,
		options: skillCategories.options,
		initialValues: [],
		setInitialValues: () => {},
	} as HelpSelectorProps,
} satisfies Meta<typeof HelpSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

// Базовый стиль для контейнера
const baseContainerStyle: CSSProperties = {
	padding: '20px',
	border: '1px dashed #ccc',
	borderRadius: '8px',
	marginBottom: '24px',
	textAlign: 'left',
};

// Стиль для общего контейнера
const wrapperStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
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

export const SkillsSelection: Story = {
	args: {
		label: skillCategories.label,
		options: skillCategories.options,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByTestId('HelpSelector')).toBeInTheDocument();
	},
};

export const FundsSelection: Story = {
	args: {
		label: fundCategories.label,
		options: fundCategories.options,
	},
};

export const MultipleExamples: Story = {
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [skillsValues, setSkillsValues] = useState<string[]>([
			'UI/UX дизайн',
		]);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [fundsValues, setFundsValues] = useState<string[]>([
			'Фонд "Помоги детям"',
		]);

		return (
			<div style={wrapperStyle}>
				{/* Пример "Чем помочь" */}
				<div style={baseContainerStyle}>
					<div style={containerLabelStyle}>Выбор навыков (категории)</div>
					<HelpSelector
						{...args}
						label={skillCategories.label}
						options={skillCategories.options}
						initialValues={skillsValues}
						setInitialValues={setSkillsValues}
					/>
				</div>

				{/* Пример "Кому помочь" */}
				<div style={baseContainerStyle}>
					<div style={containerLabelStyle}>Выбор фондов</div>
					<HelpSelector
						{...args}
						label={fundCategories.label}
						options={fundCategories.options}
						initialValues={fundsValues}
						setInitialValues={setFundsValues}
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

export const MobileView: Story = {
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [values, setValues] = useState<string[]>(['Фонд "Помоги детям"']);

		return (
			<div style={{ ...baseContainerStyle, width: '90vw' }}>
				<div style={containerLabelStyle}>Мобильный вид (выбор фондов)</div>
				<HelpSelector
					{...args}
					label={fundCategories.label}
					options={fundCategories.options}
					initialValues={values}
					setInitialValues={setValues}
				/>
			</div>
		);
	},
	parameters: {
		viewport: {
			defaultViewport: 'mobile1',
		},
	},
};
