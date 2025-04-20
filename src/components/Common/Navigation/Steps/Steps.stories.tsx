import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Steps } from './Steps';
import { CategorySteps } from './types';

const meta: Meta<typeof Steps> = {
	title: 'Common/Navigation/Steps',
	component: Steps,
	parameters: {
		layout: 'fullscreen',
		viewport: {
			defaultViewport: 'desktop',
		},
	},
	tags: ['autodocs'],
	argTypes: {
		title: {
			name: 'title',
			control: 'text',
			defaultValue: 'Редактирование профиля',
			description: 'Title for the Steps component',
		},
		data: {
			name: 'data',
			control: 'object',
			defaultValue: [
				{ counter: 1, text: 'Контактное лицо', link: '/contact-person' },
				{ counter: 2, text: 'Реквизиты', link: '/requisites' },
				{ counter: 3, text: 'Документы и файлы', link: '/documents-and-files' },
				{ counter: 4, text: 'Описание', link: '/description' },
				{ counter: 5, text: 'Ссылки', link: '/links' },
			],
			description: 'Array of steps data',
		},
		step: {
			name: 'step',
			control: 'number',
			defaultValue: 3,
			description: "Current step's number",
		},
		category: {
			name: 'category',
			control: 'radio',
			defaultValue: CategorySteps.WITH_DISABLED_STEPS,
			description: 'Category of Steps',
		},
	},
};

export default meta;

type Story = StoryObj<typeof Steps>;

const mockChangeStep = (step: number) => {
	console.log('Step changed to:', step);
};

export const Default: Story = {
	args: {
		data: [
			{ counter: 1, text: 'Контактное лицо', link: '/contact-person' },
			{ counter: 2, text: 'Реквизиты', link: '/requisites' },
			{ counter: 3, text: 'Документы и файлы', link: '/documents-and-files' },
			{ counter: 4, text: 'Описание', link: '/description' },
			{ counter: 5, text: 'Ссылки', link: '/links' },
		],
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Steps');
		await expect(element).toBeInTheDocument();
	},
};

export const ProfileEditTasks: Story = {
	args: {
		title: 'Редактирование профиля',
		step: 1,
		data: [
			{ counter: 1, text: 'Категория', link: '/category' },
			{ counter: 2, text: 'Подкатегория', link: '/subcategory' },
			{ counter: 3, text: 'Описание', link: '/description' },
		],
		changeStep: mockChangeStep,
		category: CategorySteps.WITH_DISABLED_STEPS,
	},
};

export const Assessment: Story = {
	args: {
		title: 'ЛК Волонтера/Оценка работы с фондом',
		step: 3,
		data: [
			{ counter: 1, text: 'Трудозатраты', link: '/labor-expenditures' },
			{ counter: 2, text: 'Оценка', link: '/valuation' },
			{ counter: 3, text: 'Отзывы', link: '/reviews' },
		],
		changeStep: mockChangeStep,
		category: CategorySteps.WITH_DISABLED_STEPS,
	},
};

export const ProfileEditTasksNKO: Story = {
	args: {
		title: 'ЛК НКО/Ваши задания/Создание задачи',
		step: 1,
		data: [
			{ counter: 1, text: 'Категория', link: '/category' },
			{ counter: 2, text: 'Шаблон', link: '/pattern' },
			{ counter: 3, text: 'Описание', link: '/description' },
			{ counter: 4, text: 'Файлы', link: '/files' },
			{ counter: 5, text: 'Срок выполнения', link: '/deadline' },
		],
		changeStep: mockChangeStep,
		category: CategorySteps.WITH_DISABLED_STEPS,
	},
};

export const AssessmentNKO: Story = {
	args: {
		title: 'ЛК НКО/Оценка работы волонтера',
		step: 2,
		data: [
			{ counter: 1, text: 'Оценка', link: '/valuation' },
			{ counter: 2, text: 'Отзыв', link: '/review' },
			{ counter: 3, text: 'Благодарность', link: '/thank' },
		],
		changeStep: mockChangeStep,
		category: CategorySteps.WITH_DISABLED_STEPS,
	},
};

export const StepsStoryWithDisabledSteps: Story = {
	args: {
		title: 'Редактирование профиля',
		step: 3,
		data: [
			{ counter: 1, text: 'Контактное лицо', link: '/contact-person' },
			{ counter: 2, text: 'Реквизиты', link: '/requisites' },
			{ counter: 3, text: 'Документы и файлы', link: '/documents-and-files' },
			{ counter: 4, text: 'Описание', link: '/description' },
			{ counter: 5, text: 'Ссылки', link: '/links' },
		],
		changeStep: mockChangeStep,
		category: CategorySteps.WITH_DISABLED_STEPS,
	},
};

export const StepsStoryWithoutDisabledSteps: Story = {
	args: {
		title: 'Редактирование профиля',
		step: 3,
		data: [
			{ counter: 1, text: 'Контактное лицо', link: '/contact-person' },
			{ counter: 2, text: 'Реквизиты', link: '/requisites' },
			{ counter: 3, text: 'Документы и файлы', link: '/documents-and-files' },
			{ counter: 4, text: 'Описание', link: '/description' },
			{ counter: 5, text: 'Ссылки', link: '/links' },
		],
		changeStep: mockChangeStep,
		category: CategorySteps.WITHOUT_DISABLED_STEPS,
	},
};
