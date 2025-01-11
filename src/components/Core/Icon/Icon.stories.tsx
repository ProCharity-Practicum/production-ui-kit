import { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { IconNames } from './types.tsx';
import { expect, within } from '@storybook/test';

const meta: Meta<typeof Icon> = {
	title: 'Common/Utils/Icon',
	component: Icon,
	tags: ['autodocs'],
	args: {
		size: 50,
		color: '#A0ABB5',
	},
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
	args: {
		name: IconNames.user,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Icon');
		await expect(element).toBeInTheDocument();
	},
};

export const AllIcons: Story = {
	render: (props) => {
		return (
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(10, 50px)',
					gridAutoRows: '50px',
					gap: '20px',
					cursor: 'pointer',
				}}
			>
				{(Object.keys(IconNames) as IconNames[]).map((name) => (
					<span
						key={name}
						onClick={() => {
							const input = document.createElement('input');
							input.type = 'text';
							input.value = `IconNames.${name}`;
							input.style.position = 'absolute';
							input.style.top = '-50px';
							document.body.append(input);
							input.select();
							document.execCommand('copy');
							input.remove();
						}}
					>
						<Icon {...props} name={name} />
					</span>
				))}
			</div>
		);
	},
};
