import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Radio } from './Radio';

// Моковые данные для демонстрации
const radioOptions = {
	name: 'radio-group',
	options: [
		{ label: 'Option 1', value: 'option1' },
		{ label: 'Option 2', value: 'option2' },
		{ label: 'Option 3', value: 'option3' },
	],
};

// Стили для контейнеров
const containerStyle: React.CSSProperties = {
	padding: '20px',
	border: '1px dashed #ccc',
	borderRadius: '8px',
	marginBottom: '24px',
	textAlign: 'left',
};

const wrapperStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
	maxWidth: '100%',
	padding: '20px',
};

const containerLabelStyle: React.CSSProperties = {
	fontWeight: 'bold',
	marginBottom: '12px',
	color: '#666',
	fontSize: '14px',
};

const meta: Meta<typeof Radio> = {
	title: 'Forms/Select/Radio',
	component: Radio,
	parameters: {
		layout: 'centered',
	},
	args: {
		children: 'Radio option',
		disabled: false,
	},
	argTypes: {
		children: {
			control: 'text',
			description: 'Label content',
		},
		disabled: {
			control: 'boolean',
			description: 'Disable the radio button',
		},
		focused: {
			control: 'boolean',
			description: 'Control focus state',
		},
		labelledBy: {
			control: 'text',
			description: 'ID of the element labeling the radio',
		},
		controlRef: {
			table: {
				disable: true,
			},
		},
		onFocus: {
			action: 'focused',
			table: {
				category: 'Events',
			},
		},
		onBlur: {
			action: 'blurred',
			table: {
				category: 'Events',
			},
		},
		onChange: {
			action: 'changed',
			table: {
				category: 'Events',
			},
		},
	},
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof Radio>;

export const BasicUsage: Story = {
	args: {
		name: radioOptions.name,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByRole('radio')).toBeInTheDocument();
	},
};

export const DisabledState: Story = {
	args: {
		name: radioOptions.name,
		disabled: true,
	},
	render: (args) => (
		<div style={containerStyle}>
			<div style={containerLabelStyle}>Disabled Radio</div>
			<Radio {...args}>Disabled option</Radio>
		</div>
	),
};

export const GroupExample: Story = {
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [selected, setSelected] = useState(radioOptions.options[0].value);

		return (
			<div style={wrapperStyle}>
				<div style={containerStyle}>
					<div style={containerLabelStyle}>Radio Group</div>
					{radioOptions.options.map((option) => (
						<Radio
							key={option.value}
							name={radioOptions.name}
							value={option.value}
							checked={selected === option.value}
							onChange={() => setSelected(option.value)}
						>
							{option.label}
						</Radio>
					))}
				</div>
			</div>
		);
	},
};

export const FormIntegration: Story = {
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [selectedValue, setSelectedValue] = useState('');
		const handleChange = (value: string) => {
			setSelectedValue(value);
		};

		// Обработчик отправки формы
		const handleSubmit = (e: React.FormEvent) => {
			e.preventDefault();
			console.log('Form submitted with value:', selectedValue);
		};

		return (
			<form onSubmit={handleSubmit} style={wrapperStyle}>
				<div style={containerStyle}>
					<div style={containerLabelStyle}>Radio Group in Form</div>
					{radioOptions.options.map((option) => (
						<Radio
							key={option.value}
							name={radioOptions.name}
							value={option.value}
							checked={selectedValue === option.value}
							onChange={() => handleChange(option.value)}
						>
							{option.label}
						</Radio>
					))}

					<button type="submit" style={{ marginTop: '20px' }}>
						Submit
					</button>
				</div>
			</form>
		);
	},

	// Добавляем проверки для стори
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getAllByRole('radio')).toHaveLength(
			radioOptions.options.length
		);
		await expect(
			canvas.getByRole('button', { name: /submit/i })
		).toBeInTheDocument();
		const radios = canvas.getAllByRole('radio');
		await expect(radios[0]).not.toBeChecked();
		await expect(radios[1]).not.toBeChecked();
		await expect(radios[2]).not.toBeChecked();
	},
};
