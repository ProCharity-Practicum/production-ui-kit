import { Icon } from '@/components/Core/Icon';
import Friends from '@/assets/images/logo_druzya.png';
import Grant from '@/assets/images/pgrants_logo_gark.png';
import Vk from '@/assets/images/vk.png';
import Telegram from '@/assets/images/telegram.png';

export const MENU_PROPS = {
	isSticky: true,
	autoCollapseThreshold: 500,
	menu: [
		{ label: 'О проекте', href: '/about_project' },
		{ label: 'Задачи', href: '/tasks' },
		{ label: 'Волонтерам', href: '/volunteers' },
		{ label: 'Для НКО', href: '/foundations' },
		{ label: 'Бизнесу', href: '/company' },
		{ label: 'FAQ', href: '/help' },
		{ label: <Icon name="search" />, href: '/search' },
	],
};

export const FOOTER_PROPS = {
	columns: [
		{
			columnTitle: 'О проекте',
			links: [
				{ linkTitle: 'Новости', url: '/news' },
				{ linkTitle: 'Команда', url: '/about_project/team' },
				{
					linkTitle: 'Документы',
					url: '/about_project/documents_and_requisites',
				},
				{ linkTitle: 'Контакты', url: '/about_project/contacts' },
			],
		},
		{
			columnTitle: 'Задания',
			links: [
				{ linkTitle: 'Ждут исполнителей', url: '/tasks' },
				{ linkTitle: 'В работе', url: '/tasks/in_progress' },
				{ linkTitle: 'Архив', url: '/tasks/archive' },
				{ linkTitle: 'Предложения', url: '/tasks/proposals' },
			],
		},
		{
			columnTitle: 'Волонтерам',
			links: [
				{ linkTitle: 'Как помочь', url: '/volunteers/how_to_help' },
				{ linkTitle: 'Бонусы', url: '/bonuses' },
				{ linkTitle: 'Истории волонтеров', url: '/volunteers/stories' },
			],
		},
		{
			columnTitle: 'Фондам',
			links: [
				{
					linkTitle: 'Как получить помощь',
					url: '/foundations/how_to_get_help',
				},
				{ linkTitle: 'База волонтеров', url: '/volunteers' },
				{ linkTitle: 'НКО о нас', url: '/foundations/about_us' },
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
};

export const APPLY_PROPS = {
	volunteer: {
		rules: '#',
		reg: '/volunteers',
	},
	fund: {
		rules: '#',
		reg: '/foundations',
	},
};
