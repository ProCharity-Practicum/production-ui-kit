import { useArgs } from '@storybook/preview-api';
import { Paginator } from './Paginator';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Paginator> = {
	title: 'Common/Navigation/Paginator',
	component: Paginator,
	argTypes: {
		current: {
			control: { type: 'number', min: 1 },
			description: 'Текущая страница',
		},
		total: {
			control: { type: 'number', min: 1 },
			description: 'Общее количество страниц',
		},
		maxPages: {
			control: { type: 'number', min: 3, max: 10 },
			description: 'Максимальное количество отображаемых страниц',
		},
	},
	args: {
		current: 3,
		total: 10,
		maxPages: 5,
	},
	render: function Render(args) {
		const [, updateArgs] = useArgs();

		const getLink = args.getLink || ((page: number) => `?page=${page}`);

		const handleClick = (e: React.MouseEvent, page: number) => {
			e.preventDefault();
			updateArgs({ current: page });
			console.log(`Navigating to page ${page}`);
		};

		return (
			<div
				onClick={(e) => {
					const target = e.target as HTMLElement;
					const anchor = target.closest('a');
					if (anchor) {
						const page = new URL(
							anchor.href,
							'http://localhost'
						).searchParams.get('page');
						if (page) {
							handleClick(e, parseInt(page));
						}
					}
				}}
			>
				<Paginator {...args} getLink={getLink} />
				<div
					style={{
						marginTop: '20px',
						padding: '10px',
						background: '#f5f5f5',
						borderRadius: '4px',
						fontSize: '14px',
					}}
				>
					<div>
						<strong>Current page:</strong> {args.current}
					</div>
					<div>
						<strong>URL params:</strong> {getLink(args.current)}
					</div>
				</div>
			</div>
		);
	},
};

export default meta;

type Story = StoryObj<typeof Paginator>;

export const Default: Story = {};

export const WithQueryParams: Story = {
	args: {
		current: 2,
		total: 5,
		getLink: (page: number) => `?page=${page}&filter=test&sort=asc`,
	},
};
