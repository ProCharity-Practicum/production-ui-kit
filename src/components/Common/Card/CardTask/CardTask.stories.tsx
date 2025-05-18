import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { CardTask } from './CardTask';
import { ButtonOutline } from '@charitypro/ui-kit';
import { Shape } from '../../User';
import avatar from '../../../../assets/images/avatar_image.png';
import logo_task from '../../../../assets/images/logo_task.png';
import { TagColor } from '../../Tag/types';

const meta: Meta<typeof CardTask> = {
	title: 'Common/Content/Card/Task/CardTask',
	component: CardTask,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div style={{ minWidth: '360px', height: '496px' }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof CardTask>;

/**
 * Default — базовая карточка
 */
export const Default: Story = {
	args: {
		data: {
			name: 'Task name',
			category: 'Category',
			views: 15,
			profit: 1,
			dueDate: '20 декабря 2025',
			location: 'Удаленно',
		},
		actions: <ButtonOutline>Изменить</ButtonOutline>,
		href: '#',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByText('Task name')).toBeInTheDocument();
	},
};

/**
 * Draft — карточка в черновике
 */
export const DraftCard: Story = {
	args: {
		data: {
			name: 'Task name',
			category: 'Category',
			dueDate: 'Не установлена',
			location: 'Location',
			profit: 1,
		},
		actions: <ButtonOutline>Изменить</ButtonOutline>,
	},
};

/**
 * Moderation — карточка на модерации
 */
export const ModerationCard: Story = {
	args: {
		data: {
			name: 'Task name',
			category: 'Category',
			dueDate: '20 июля 2020г.',
			location: 'Location',
			profit: 1,
		},
		actions: <ButtonOutline>Изменить</ButtonOutline>,
	},
};

/**
 * For Volunteer — отказ от задачи
 */
export const ForVolunteer: Story = {
	args: {
		data: {
			name: 'Task name',
			category: 'SMM',
			dueDate: '15 июня 2025',
			location: 'Москва',
		},
		actions: <ButtonOutline>Отказаться</ButtonOutline>,
	},
};

/**
 * No Tags or Stats — карточка без тегов и просмотров
 */
export const NoTagsOrStatsCard: Story = {
	args: {
		data: {
			name: 'Без тегов и статистики',
			category: 'SMM',
			dueDate: '1 июня 2025',
			location: 'Казань',
		},
		actions: <ButtonOutline>Изменить</ButtonOutline>,
	},
};

/**
 * Long Title — карточка с длинным заголовком
 */
export const LongTitleCard: Story = {
	args: {
		data: {
			name: 'Очень длинное название задачи, которое должно корректно переноситься и не ломать верстку карточки ни при каких условиях',
			category: 'Маркетинг',
			dueDate: '5 сентября 2025',
			location: 'Санкт-Петербург',
		},
		actions: <ButtonOutline>Изменить</ButtonOutline>,
	},
};

export const ArchiveCard: Story = {
	args: {
		data: {
			name: 'Task name',
			category: 'Category',
			profit: 1,
			dueDate: '20 июля 2020г.',
			status: 'archive',
			username: 'Имя Фамилия',
		},
		actions: <ButtonOutline>Создать копию</ButtonOutline>,
	},
};

/**
 * ResponseCard — карточка с комментариями и откликами + аватар (БЕЗ ОБВОДКИ)
 */
export const TaskResponseCard: Story = {
	args: {
		data: {
			name: 'Task name',
			category: 'Category',
			views: 15,
			profit: 1,
			// tags: [{ value: 'COVID-19' }],
			dueDate: '20 июля 2020г.',
			location: 'Location',
			user: {
				avatarUrl: logo_task,
				title: '20 июля 2020г.',
				infoTextUp: 'Дата сдачи задания',
				infoTextDown: 'Location',
				shape: Shape.Square,
			},
		},
		actions: (
			<>
				<ButtonOutline icon="comment" counter={1} />
				<ButtonOutline counter={1}>Отклики</ButtonOutline>
			</>
		),
	},
};

export const VolunteerResponseCard: Story = {
	args: {
		data: {
			name: 'Task name',
			category: 'Category',
			views: 1,
			profit: 1,
			//tags: [{ value: 'COVID-19' }],
			dueDate: '20 июля 2020г.',
			location: 'Location',
			user: {
				avatarUrl: logo_task,
				title: '20 июля 2020г.',
				infoTextUp: 'Дата сдачи задания',
				infoTextDown: 'Location',
				shape: Shape.Square,
			},
		},
		actions: (
			<>
				<ButtonOutline icon="comment" counter={1} />
				<ButtonOutline counter={0}>Отказаться</ButtonOutline>
			</>
		),
	},
};

export const VolunteerInProgressCard: Story = {
	args: {
		data: {
			name: 'Task name',
			category: 'Category',
			profit: 1,
			//tags: [{ value: 'COVID-19' }],
			dueDate: '20 июля 2020г.',
			location: 'Location',
			user: {
				avatarUrl: logo_task,
				title: '20 июля 2020г.',
				infoTextUp: 'Дата сдачи задания',
				infoTextDown: 'Location',
				shape: Shape.Square,
			},
		},
		actions: (
			<>
				<ButtonOutline icon="comment" counter={1} />
				<ButtonOutline counter={0}>Выполнена</ButtonOutline>
			</>
		),
	},
};

export const VolunteerReviewCard: Story = {
	args: {
		data: {
			name: 'Task name',
			category: 'Category',
			profit: 1,
			tags: [{ value: 'COVID-19', color: TagColor.Primary }],
			dueDate: '20 июля 2020г.',
			location: 'Location',
			user: {
				avatarUrl: logo_task,
				title: '20 июля 2020г.',
				infoTextUp: 'Дата сдачи задания',
				infoTextDown: 'Location',
				shape: Shape.Square,
			},
		},
		actions: (
			<>
				<ButtonOutline icon="comment" counter={1} />
			</>
		),
	},
};

export const VolunteerCompletedCard: Story = {
	args: {
		data: {
			name: 'Task name',
			category: 'Category',
			profit: 1,
			//tags: [{ value: 'COVID-19' }],
			dueDate: '20 июля 2020г.',
			location: 'Location',
			user: {
				avatarUrl: logo_task,
				title: '20 июля 2020г.',
				infoTextUp: 'Дата сдачи задания',
				infoTextDown: 'Location',
				shape: Shape.Square,
			},
		},
		actions: (
			<>
				<ButtonOutline>Оценить работу с фондом</ButtonOutline>
			</>
		),
	},
};

export const VolunteerDraftCard: Story = {
	args: {
		data: {
			name: 'Task name',
			category: 'Category',
			dueDate: 'Не установлена',
			location: 'Location',
			profit: 1,
			useActualUntil: true,
		},
		actions: (
			<>
				<ButtonOutline>Изменить</ButtonOutline>
			</>
		),
	},
};

/**
 * InProgressCard — карточка с обводкой (senior)
 */
export const InProgressCard: Story = {
	args: {
		data: {
			name: 'Task name',
			category: 'Category',
			profit: 1,
			user: {
				avatarUrl: avatar,
				title: 'Имя Фамилия',
				infoTextUp: 'Волонтёр-исполнитель',
				infoTextDown: 'Location',
				seniority: 'senior', // ✅ glowing border
			},
		},
		actions: (
			<>
				<ButtonOutline icon="comment" counter={1} />
				<ButtonOutline icon="socialLogo" />
				<ButtonOutline>Оценить</ButtonOutline>
			</>
		),
	},
};

export const VolunteerTaskCard: Story = {
	args: {
		data: {
			name: 'Task name',
			category: 'Category',
			views: 15,
			profit: 1,
			status: 'offers',
			user: {
				avatarUrl: avatar,
				title: 'Актуально до',
				infoTextUp: 'Имя Фамилия',
				infoTextDown: '20 июля 2020г.',
				shape: Shape.Circle,
				seniority: 'senior',
			},
		},
		actions: (
			<>
				<ButtonOutline icon="comment" counter={1} />
				<ButtonOutline counter={1}>Заявки</ButtonOutline>
			</>
		),
	},
};

export const VolunteerOfferTaskCard: Story = {
	args: {
		data: {
			name: 'Task name',
			category: 'Category',
			views: 1,
			profit: 1,
			status: 'offers',
			user: {
				avatarUrl: avatar,
				title: 'Актуально до',
				infoTextUp: 'Имя Фамилия',
				infoTextDown: '20 июля 2020г.',
				shape: Shape.Circle,
				seniority: 'senior',
			},
		},
		actions: (
			<>
				<ButtonOutline icon="comment" counter={1} />
				<ButtonOutline counter={0}>Отказаться</ButtonOutline>
			</>
		),
	},
};
