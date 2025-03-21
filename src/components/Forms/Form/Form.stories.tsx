import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from '@storybook/test';

import { Form, FormProps } from './Form';
import { FormProvider } from '@/components/Forms/Form/FormProvider.tsx';
import { FormEventHandler } from 'react';

const meta = {
	title: 'New/Form',
	component: Form,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
		// viewport: {
		// 	defaultViewport: 'desktop',
		// },
	},
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Form');
		await expect(element).toBeInTheDocument();
	},
};

export const WithContext: Story = {
	args: {
		onSubmit: fn(),
	},
	render: (args) => {
		const CatchForm = ({ children, onSubmit, ...props }: FormProps) => {
			const onSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
				e.preventDefault();
				onSubmit?.(e);
				return false;
			};

			return (
				<form {...props} onSubmit={onSubmitHandler}>
					{children}
				</form>
			);
		};

		return (
			<FormProvider FormElement={CatchForm}>
				<Form
					{...args}
					style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
				>
					<label>
						<span>Field1: </span>
						<input type="text" name="field1" />
					</label>
					<button type="submit">SEND</button>
				</Form>
			</FormProvider>
		);
	},
};
