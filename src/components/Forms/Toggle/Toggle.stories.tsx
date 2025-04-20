import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Toggle } from './Toggle';
import { useState } from 'react';

const meta = {
	title: 'Forms/Toggle/Default',
	component: Toggle,
	parameters: {
		layout: 'centered',
	},
	args: {
		text: 'Только онлайн-задачи',
	},
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [checked, setChecked] = useState(args.checked || false);
		return <Toggle {...args} checked={checked} onChange={setChecked} />;
	},
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		checked: false,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByTestId('Toggle')).toBeInTheDocument();
	},
};
