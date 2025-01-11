import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Tag, ViewsTag, DiamondTag, OutlineTag, PrimaryTag } from './Tag';
import { TagColor } from '@/components/Common/Tag/types.ts';

const meta = {
	title: 'Common/Typography/Tag',
	component: Tag,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'The `Tag` component is used to display labeled values with optional icons and styles.',
			},
		},
	},
	argTypes: {
		value: {
			control: 'text',
			description: 'The value to be displayed inside the tag.',
		},
		variant: {
			control: 'select',
			options: Object.values(TagColor),
			description: 'The variant of the tag.',
		},
	},
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: 'Default Tag',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Tag');
		await expect(element).toBeInTheDocument();
	},
};

export const Primary: Story = {
	args: { value: 'Actual' },
	render: (props) => <PrimaryTag {...props} />,
};

export const Outline: Story = {
	args: { value: 'Actual' },
	render: (props) => <OutlineTag {...props} />,
};

export const Views: Story = {
	args: { value: 1 },
	render: (props) => <ViewsTag {...props} />,
};

export const Diamond: Story = {
	args: { value: 2 },
	render: (props) => <DiamondTag {...props} />,
};
