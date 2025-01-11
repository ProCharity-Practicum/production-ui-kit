import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { CardCategoryLarge } from './CardCategoryLarge';
import plugImageDesign from '@public/examples/design.png?url';
import plugImageMarketing from '@public/examples/marketing.png?url';
import plugImageTranslations from '@public/examples/translations.png?url';

const meta: Meta<typeof CardCategoryLarge> = {
	title: 'Common/Content/Card/Task/Category',
	component: CardCategoryLarge,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {},
	decorators: [
		(Story) => (
			<div style={{ maxWidth: '360px' }}>
				<Story />
			</div>
		),
	],
};
export default meta;
type Story = StoryObj<typeof CardCategoryLarge>;

export const Default: Story = {
	args: {
		title: 'Пример категории',
		text: 'Здесь должен быть очень длинный текст для категории, но сейчас его нет',
		amount: 777,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Card');
		await expect(element).toBeInTheDocument();
	},
};

export const Design: Story = {
	args: {
		title: 'Дизайн',
		text: 'полиграфия, фирменный стиль и логотипы, иллюстрации, анимация, 3D-графика, UX/UI',
		image: plugImageDesign,
		amount: 1,
	},
};

export const Marketing: Story = {
	args: {
		title: 'Маркетинг',
		text: 'Email-рассылки, соцсети, реклама, событийный и стратегический маркетинг',
		image: plugImageMarketing,
		amount: 3,
	},
};

export const Translations: Story = {
	args: {
		title: 'Переводы',
		text: 'английский, немецкий, французский, испанский, иврит, жестовый',
		image: plugImageTranslations,
		amount: 7,
	},
};
