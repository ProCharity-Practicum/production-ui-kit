import type { Meta, StoryObj } from '@storybook/react';

import { Header, MenuLink } from './Header';
import { expect, fn, within } from '@storybook/test';
import { FunctionComponent } from 'react';
import { Icon } from '@/components/Core/Icon';

const { GuestUser } = Header as unknown as Record<
	string,
	FunctionComponent<unknown>
>;

const menu: MenuLink[] = [
	{ label: 'О проекте', href: '#' },
	{ label: 'Задачи', href: '#' },
	{ label: 'Волонтерам', href: '#' },
	{ label: 'Для НКО', href: '#' },
	{ label: 'Бизнесу', href: '#' },
	{ label: 'FAQ', href: '#' },
	{ label: <Icon name="search" />, href: '#' },
];

const meta = {
	title: 'Common/Layout/Header',
	component: Header,
	subcomponents: { GuestUser },
	parameters: {
		layout: 'fullscreen',
		viewport: {
			defaultViewport: 'desktop',
		},
	},
	args: {
		menu,
		children: <Header.GuestUser signUpLink={fn()} signInLink={fn()} />,
	},
	render: (props) => (
		<>
			<Header {...props} />
			<ContentMock />
			<ContentMock />
			<ContentMock />
		</>
	),
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const ContentMock = () => (
	<div>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci
			alias amet aut autem corporis deserunt error esse et eveniet
			exercitationem expedita, illum libero maiores maxime necessitatibus nobis
			numquam perspiciatis possimus quam quasi quidem quo quos repudiandae sit
			tempore tenetur. Adipisci consectetur culpa eius, eos harum ipsam modi
			nesciunt pariatur quaerat saepe tempora tempore. Commodi deleniti dolores
			dolorum ducimus eveniet nulla quaerat, reiciendis? Aliquid magnam
			molestiae ut! Laudantium praesentium quaerat quod unde ut! Aperiam at aut
			autem deleniti dicta dignissimos dolorem harum hic incidunt minima,
			officia, perspiciatis possimus quam quas quidem quod suscipit totam vel
			velit voluptates! Atque, exercitationem, ipsum.
		</p>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci
			alias amet aut autem corporis deserunt error esse et eveniet
			exercitationem expedita, illum libero maiores maxime necessitatibus nobis
			numquam perspiciatis possimus quam quasi quidem quo quos repudiandae sit
			tempore tenetur. Adipisci consectetur culpa eius, eos harum ipsam modi
			nesciunt pariatur quaerat saepe tempora tempore. Commodi deleniti dolores
			dolorum ducimus eveniet nulla quaerat, reiciendis? Aliquid magnam
			molestiae ut! Laudantium praesentium quaerat quod unde ut! Aperiam at aut
			autem deleniti dicta dignissimos dolorem harum hic incidunt minima,
			officia, perspiciatis possimus quam quas quidem quod suscipit totam vel
			velit voluptates! Atque, exercitationem, ipsum.
		</p>
	</div>
);

export const Default: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Header');
		await expect(element).toBeInTheDocument();
	},
};

export const Sticky: Story = {
	args: {
		isSticky: true,
	},
};

export const Collapsed: Story = {
	args: {
		isCollapsed: true,
	},
};

export const AutoCollapsed: Story = {
	args: {
		autoCollapseThreshold: 10,
	},
};

export const TabletAndMobile: Story = {
	parameters: {
		viewport: {
			defaultViewport: 'tablet',
		},
	},
};
