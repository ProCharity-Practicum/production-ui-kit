import type { Meta, StoryObj } from '@storybook/react';
import { Filtration } from './Filtration';
import { useState } from 'react';

const meta: Meta<typeof Filtration> = {
	title: 'Common/Filtration',
	component: Filtration,
	tags: ['autodocs'],
	argTypes: {
		role: {
			control: 'select',
			options: ['company', 'volunteer', 'nko', undefined],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Filtration>;

// Моковые данные
const mockSkills = [
	{
		title: 'IT-навыки',
		values: [
			'Веб-разработка',
			'Мобильная разработка',
			'UI/UX дизайн',
			'Тестирование ПО',
		],
	},
	{
		title: 'Творческие навыки',
		values: ['Графический дизайн', 'Копирайтинг', 'Фотография', 'Видеомонтаж'],
	},
	{
		title: 'Организационные навыки',
		values: [
			'Управление проектами',
			'Проведение мероприятий',
			'Работа с волонтёрами',
			'Фандрайзинг',
			'Социальные медиа',
		],
	},
];

const mockFunds = {
	title: 'Фонды',
	values: ["Фонд 'Помоги детям'", "Приют 'Лапа'", 'Эко-центр'],
};

// Базовая стори
export const Default: Story = {
	args: {
		howOptions: mockSkills,
		whoOptions: [mockFunds],
		setSelectedFilters: (filters) => console.log('Selected filters:', filters),
	},
};

// Стори для волонтера (только "Чем помочь")
export const VolunteerView: Story = {
	args: {
		howOptions: mockSkills,
		role: 'volunteer',
		setSelectedFilters: (filters) => console.log('Volunteer filters:', filters),
	},
};

// Стори для НКО (только "Кому помочь")
export const NKOView: Story = {
	args: {
		whoOptions: [mockFunds],
		role: 'nko',
		setSelectedFilters: (filters) => console.log('NKO filters:', filters),
	},
};

// Стори с предустановленными фильтрами
export const WithPreselectedFilters: Story = {
	args: {
		howOptions: mockSkills,
		whoOptions: [mockFunds],
		defaultFilters: {
			categories: ['Мобильная разработка'],
			funds: ["Фонд 'Помоги детям'"],
			search: ['срочно'],
			isOnline: true,
		},
		setSelectedFilters: (filters) =>
			console.log('Preselected filters:', filters),
	},
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [currentFilters, setCurrentFilters] = useState(args.defaultFilters);

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
				<Filtration
					{...args}
					setSelectedFilters={(filters) => {
						args.setSelectedFilters(filters);
						setCurrentFilters(filters);
					}}
				/>

				<div
					style={{
						background: '#f8f8f8',
						padding: '12px',
						borderRadius: '4px',
						fontFamily: 'monospace',
						fontSize: '13px',
						overflowX: 'auto',
					}}
				>
					<div style={{ marginBottom: '4px', fontWeight: 'bold' }}>
						Возвращаемые данные:
					</div>
					<pre>{JSON.stringify(currentFilters, null, 2)}</pre>
				</div>
			</div>
		);
	},
};
