import { Meta, StoryObj } from '@storybook/react';
import { Footer, FooterProps } from './Footer';
import Telegram from '../../../../assets/images/telegram.png';
import Vk from '../../../../assets/images/vk.png';
import Friends from '../../../../assets/images/logo_druzya.png';
import Grant from '../../../../assets/images/pgrants_logo_gark.png';
import { expect, within } from '@storybook/test';

const meta: Meta<FooterProps> = {
	title: 'Common/Layout/Footer',
	component: Footer,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		columns: [
			{
				columnTitle: 'О проекте',
				links: [
					{ linkTitle: 'Новости', url: '#' },
					{ linkTitle: 'Команда', url: '#' },
					{ linkTitle: 'Документы', url: '#' },
					{ linkTitle: 'Контакты', url: '#' },
				],
			},
			{
				columnTitle: 'Задания',
				links: [
					{ linkTitle: 'Ждут исполнителей', url: '#' },
					{ linkTitle: 'В работе', url: '#' },
					{ linkTitle: 'Архив', url: '#' },
					{ linkTitle: 'Предложения', url: '#' },
				],
			},
			{
				columnTitle: 'Волонтерам',
				links: [
					{ linkTitle: 'Как помочь', url: '#' },
					{ linkTitle: 'Бонусы', url: '#' },
					{ linkTitle: 'Истории волонтеров', url: '#' },
				],
			},
			{
				columnTitle: 'Фондам',
				links: [
					{ linkTitle: 'Как получить помощь', url: '#' },
					{ linkTitle: 'База волонтеров', url: '#' },
					{ linkTitle: 'НКО о нас', url: '#' },
				],
			},
		],
		sponsors: [
			{
				name: 'Фонд Друзья',
				logo: <img src={Friends} alt="VK" />,
				url: 'https://friend-fund.com',
			},
			{
				name: 'Фонд Президентских Грантов',
				logo: <img src={Grant} alt="VK" />,
				url: 'https://presidential-grants.ru',
			},
		],
		socialLinks: [
			{
				icon: <img src={Vk} alt="VK" />,
				name: 'Сообщество ВКонтакте',
				url: 'https://vk.com',
			},
			{
				icon: <img src={Telegram} alt="Telegram" />,
				name: 'Бот ProCharity в Telegram',
				url: 'https://telegram.org',
			},
			{
				icon: <img src={Telegram} alt="Telegram" />,
				name: 'Канал для волонтеров',
				url: 'https://telegram.org',
			},
			{
				icon: <img src={Telegram} alt="Telegram" />,
				name: 'Канал для НКО',
				url: 'https://telegram.org',
			},
		],
		copyright:
			'© 2017–2024 ProCharity. Юридическая информация и защита персональных данных.',
	},
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<FooterProps>;

export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Footer');
		await expect(element).toBeInTheDocument();
	},
};
