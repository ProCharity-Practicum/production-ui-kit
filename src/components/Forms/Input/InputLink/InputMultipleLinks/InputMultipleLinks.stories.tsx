import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from '@storybook/test';

import { InputMultipleLinks } from './InputMultipleLinks';
import { useState } from 'react';
import { LinkValue } from '@/components/Forms/Input/InputLink/InputCustomLink/InputCustomLink.tsx';

const meta = {
	title: 'Forms/Input/Link/Multiple',
	component: InputMultipleLinks,
	parameters: {
		controls: {
			include: ['value', 'classname', 'name', 'onChange'],
		},
		layout: 'centered',
		args: {},
	},
} satisfies Meta<typeof InputMultipleLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	args: {
		value: [],
		onChange: fn(),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('InputMultipleLinks');
		await expect(element).toBeInTheDocument();
	},
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [state, setState] = useState<LinkValue[]>([]);
		return <InputMultipleLinks value={state} onChange={setState} />;
	},
};
