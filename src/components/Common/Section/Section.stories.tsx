import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Section } from './Section';
import { SectionNotFound } from './SectionNotFound/SectionNotFound';
import { SectionBotConnected } from './SectionBotConnected/SectionBotConnected';
import { SectionApplyCTA } from './SectionApplyCTA/SectionApplyCTA';
import { Button } from '../../Common/Button/Button';
import ProjectImage from '@/assets/images/project.png';

const meta: Meta<typeof Section> = {
	title: 'Common/Layout/Section',
	component: Section,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'The `Section` component is a flexible wrapper for displaying content in different layouts. Variants include `page` and `content`. Subcomponents like `SectionNotFound`, `SectionBotConnected`, and `SectionApplyCTA` demonstrate its flexibility.',
			},
		},
	},
	argTypes: {
		variant: {
			control: 'radio',
			options: ['page', 'content'],
			description: 'The layout variant of the section.',
			table: {
				type: { summary: 'page | content' },
				defaultValue: { summary: 'page' },
			},
		},
		title: {
			control: 'text',
			description: 'The title of the section.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'Default Section' },
			},
		},
		children: {
			control: false,
			description: 'The content inside the section.',
			table: {
				type: { summary: 'ReactNode' },
			},
		},
		image: {
			control: false,
			description: 'Optional image or illustration for the section.',
			table: {
				type: { summary: 'ReactNode' },
			},
		},
		renderAction: {
			control: false,
			description:
				'Optional function to render an action (e.g., Button or Link).',
			table: {
				type: { summary: '() => ReactNode' },
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
	args: {
		title: 'Title',
		children: 'Content',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Section');
		await expect(element).toBeInTheDocument();
	},
};

export const FullWidth: Story = {
	args: {
		variant: 'page',
		title: 'Full-Width Section',
		children: (
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit eaque
				assumenda exercitationem aut nisi architecto suscipit in rem eveniet
				ipsa voluptates, natus magni optio vitae, libero quod excepturi
				repudiandae.
			</p>
		),
		renderAction: () => <Button>Get Started</Button>,
		image: <img src={ProjectImage} alt="ProCharity" />,
	},
};
export const Content: Story = {
	args: {
		variant: 'content',
		title: 'Content Section',
		children: (
			<>
				<p>
					This is a content section with some text. It supports flexible layouts
					and styling.
				</p>
			</>
		),
		renderAction: () => <Button>Learn More</Button>,
	},
};

export const NotFound: Story = {
	render: () => <SectionNotFound />,
	parameters: {
		docs: {
			description: {
				story:
					'The `SectionNotFound` component is used for 404 error pages or missing content.',
			},
		},
	},
};

export const BotConnected: Story = {
	render: () => <SectionBotConnected />,
	parameters: {
		docs: {
			description: {
				story:
					'The `SectionBotConnected` component is used to indicate successful bot connection.',
			},
		},
	},
};

export const ApplyCTA: Story = {
	render: () => <SectionApplyCTA />,
	parameters: {
		docs: {
			description: {
				story:
					'The `SectionApplyCTA` component is used for call-to-action sections.',
			},
		},
	},
};

export const WithStateChanged: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Section');
		await expect(element).toBeInTheDocument();
	},
};
