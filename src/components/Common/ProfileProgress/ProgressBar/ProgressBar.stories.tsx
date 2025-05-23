import { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar.tsx';

const meta: Meta<typeof ProgressBar> = {
	title: 'Common/ProgressBar',
	component: ProgressBar,
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const ProgressBarAbove100: Story = {
	args: {
		value: 120,
		tooltipText: 'Зачем заполнять профиль на 100% (соревнование волонтеров)',
	},
};

export const ProgressBarBelow0: Story = {
	args: {
		value: -20,
		tooltipText: 'Зачем заполнять профиль на 100% (соревнование волонтеров)',
	},
};

export const ProgressBarDefault20: Story = {
	args: {
		value: 20,
		tooltipText: 'Зачем заполнять профиль на 100% (соревнование волонтеров)',
	},
};
