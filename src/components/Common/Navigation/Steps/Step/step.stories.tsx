import type { Meta, StoryObj } from '@storybook/react';
import { Step } from '.';

const meta: Meta<typeof Step> = {
	title: 'Components/Navigation/Step',
	component: Step,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {},
	argTypes: {
		text: {
			name: 'text',
			control: 'text',
			defaultValue: 'text',
			description: 'Step text',
		},
		number: {
			name: 'number',
			control: 'number',
			defaultValue: 1,
			description: 'Step number',
		},
		link: {
			name: 'link',
			control: 'text',
			defaultValue: '#',
			description: 'Step link',
		},
		isCurrent: {
			name: 'isCurrent',
			control: 'boolean',
			defaultValue: false,
			description: 'Step state',
		},
		isDisabled: {
			name: 'isDisabled',
			control: 'boolean',
			defaultValue: false,
			description: 'Step state',
		},
		isComplited: {
			name: 'isComplited',
			control: 'boolean',
			defaultValue: false,
			description: 'Step state',
		},
	},
};

export default meta;

type Story = StoryObj<typeof Step>;

export const Default: Story = {
	args: {
		text: 'Text',
		number: 1,
		link: '#',
		isCurrent: false,
		isDisabled: false,
		isComplited: false,
	},
};

export const Current: Story = {
	args: {
		text: 'Text',
		number: 1,
		link: '#',
		isCurrent: true,
		isDisabled: false,
		isComplited: false,
	},
};

export const Disabled: Story = {
	args: {
		text: 'Text',
		number: 1,
		link: '#',
		isCurrent: false,
		isDisabled: true,
		isComplited: false,
	},
};

export const Complited: Story = {
	args: {
		text: 'Text',
		number: 1,
		link: '#',
		isCurrent: false,
		isDisabled: false,
		isComplited: true,
	},
};

export const NotPassed: Story = {
	args: {
		text: 'Text',
		number: 1,
		link: '#',
		isCurrent: false,
		isDisabled: false,
		isComplited: false,
	},
};

export const CurrentFundRegistration: Story = {
	args: {
		text: 'Контактное лицо',
		number: 1,
		link: '#',
		isCurrent: true,
		isDisabled: false,
		isComplited: false,
	},
};

export const NotPassedFundRegistration: Story = {
	args: {
		text: 'Реквизиты',
		number: 2,
		link: '#',
		isCurrent: false,
		isDisabled: false,
		isComplited: false,
	},
};
