import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Tooltip } from './Tooltip';
import { useRef } from 'react';
import { TooltipPosition } from '@/components/Common/Tooltip/types.tsx';

const meta = {
	title: 'Common/Utils/Tooltip',
	component: Tooltip,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'dark',
		},
	},
	argTypes: {
		position: {
			control: { type: 'radio' },
			options: Object.values(TooltipPosition),
		},
	},
	args: {
		text: 'Граждане! Кружевная тень, пение птиц, дыхание ветерка - а что мы среди всего этого?!',
		children: 'trigger',
	},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (props) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const parentRef = useRef<HTMLButtonElement | null>(null);
		return (
			<div
				style={{
					height: '200px',
				}}
			>
				<Tooltip {...props}>
					<button ref={parentRef}>trigger</button>
				</Tooltip>
			</div>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Tooltip');
		await expect(element).toBeInTheDocument();
	},
};

export const OpenedBottom = {
	args: {
		isOpened: true,
		position: TooltipPosition.Bottom,
	},
};

export const OpenedTop = {
	args: {
		isOpened: true,
		position: TooltipPosition.Top,
	},
};
