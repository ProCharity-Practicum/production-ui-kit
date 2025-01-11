import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Card } from './Card';
import { FunctionComponent } from 'react';
import styles from '@/components/Common/Card/CardTask/CardTask.module.scss';
import { ButtonOutline } from '@/components/Common/Button';
const { Row, Activity, Actions, Totals, State, Work } =
	Card as unknown as Record<string, FunctionComponent<unknown>>;

const meta = {
	title: 'Common/Content/Card/Base',
	component: Card,
	subcomponents: {
		Row,
		Activity,
		Actions,
		Totals,
		State,
		Work,
	},
	tags: ['autodocs'],
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
		// viewport: {
		// 	defaultViewport: 'desktop',
		// },
	},
	args: {
		children: 'Card',
	},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	render: (props) => (
		<Card>
			<Card.Row>{props.children}</Card.Row>
		</Card>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Card');
		await expect(element).toBeInTheDocument();
	},
};

export const Featured: Story = {
	render: (props) => (
		<Card isFeatured={true}>
			<Card.Row>{props.children}</Card.Row>
		</Card>
	),
};

export const CardActivity = {
	render: () => (
		<Card>
			<Card.Activity
				items={{
					['Участник проекта']: '5 лет',
				}}
			/>
		</Card>
	),
};

export const CardTotals = {
	render: () => (
		<Card>
			<Card.Totals
				items={{
					['фондам помогли']: [34, 'primary'],
					['задач выполнено']: [562, 'secondary'],
				}}
			/>
		</Card>
	),
};

export const CardActions = {
	render: () => (
		<Card>
			<Card.Actions className={styles.responses}>
				<ButtonOutline icon="comment" counter={5} />
				<ButtonOutline counter={12}>отклики</ButtonOutline>
			</Card.Actions>
		</Card>
	),
};

export const CardState = {
	render: () => (
		<Card>
			<Card.State registered="03.01.2024" moderated="28.09.2024" />
		</Card>
	),
};

export const CardWork = {
	render: () => (
		<Card>
			<Card.Work current={5} completed={45} funds={8} hours={234} />
		</Card>
	),
};
