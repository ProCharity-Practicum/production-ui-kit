import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { ChangeEvent } from 'react';
import { Calendar } from './Calendar.tsx';
import { ICalendarProps } from './types.tsx';

const meta: Meta<ICalendarProps> = {
	title: 'Forms/Calendar',
	component: Calendar,
	decorators: [
		(Story) => {
			const [args, setArgs] = useArgs();

			function onChange(e: ChangeEvent<HTMLInputElement>) {
				setArgs({ currentDate: e.target.value });
			}

			return (
				<>
					<Story
						args={{
							...args,
							onChange,
						}}
					/>
				</>
			);
		},
	],
	argTypes: {
		currentDate: { control: 'text' },
		min: { control: 'text' },
		max: { control: 'text' },
	},
	args: {
		currentDate: '2024-01-15',
		min: '1900-01-05',
		max: '2029-01-30',
	},
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const CalendarDefault: Story = {
	args: {},
};
