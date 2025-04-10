import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { Select } from './Select';

const meta = {
	title: 'Forms/Select',
	component: Select,
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// Базовая история
export const Default: Story = {
	args: {
		options: ['chocolate', 'strawberry', 'vanilla'],
		label: 'Выберите',
		onChange: fn(),
		name: 'defaultSelect', // Добавляем name
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Select');
		await expect(element).toBeInTheDocument();
	},
};

// История с предвыбранным значением
export const HasValue: Story = {
	args: {
		options: ['chocolate', 'strawberry', 'vanilla'],
		label: 'Выберите',
		onChange: fn(),
		currentValue: 'chocolate',
		name: 'hasValueSelect', // Добавляем name
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Select');
		await expect(element).toBeInTheDocument();
	},
};

// Интерактивный пример
export const InteractiveExample: Story = {
	name: 'Интерактивный пример',
	args: {
		options: ['chocolate', 'strawberry', 'vanilla'],
		label: 'Выберите',
		onChange: fn(),
		name: 'interactiveSelect', // Добавляем name
	},
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [value, setValue] = useState(args.currentValue || '');
		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
				<Select
					{...args}
					currentValue={value}
					onChange={(val, name) => {
						args.onChange?.(val, name); // Передаем в actions
						setValue(val);
					}}
				/>
				<div>
					Текущее значение: <strong>{value || 'не выбрано'}</strong>
				</div>
			</div>
		);
	},
};

// Добавляем новую историю с группой селектов
/*export const MultipleSelectsGrid: Story = {
	name: 'Группа селектов',
	parameters: {
	  layout: 'padded', // Меняем на padded для лучшего отображения
	},
	render: () => {
	  // eslint-disable-next-line react-hooks/rules-of-hooks
	  const [values, setValues] = useState<Record<string, string>>({
		main: '',
		first: '',
		second: '',
		third: '',
		fourth: ''
	  });
  
	  const handleChange = (val: string, name?: string) => {
		if (name) {
		  setValues(prev => ({ ...prev, [name]: val }));
		}
	  };
  
	  return (
		<div style={{ 
		  width: '600px',
		  display: 'flex',
		  flexDirection: 'column',
		  gap: '20px',
		  padding: '20px'
		}}>
		 // Верхний селект (во всю ширину)
		  <Select
			label="Основной выбор"
			options={['Вариант 1', 'Вариант 2', 'Вариант 3']}
			currentValue={values.main}
			onChange={handleChange}
			name="main"
		  />
  
		  //Два ряда по два селекта 
		  <div style={{ display: 'flex', gap: '20px' }}>
			<Select
			  label="Первый селект"
			  options={['Опция A', 'Опция B', 'Опция C']}
			  currentValue={values.first}
			  onChange={handleChange}
			  name="first"
			/>
			<Select
			  label="Второй селект"
			  options={['Тип X', 'Тип Y', 'Тип Z']}
			  currentValue={values.second}
			  onChange={handleChange}
			  name="second"
			/>
		  </div>
  
		  <div style={{ display: 'flex', gap: '20px' }}>
			<Select
			  label="Третий селект"
			  options={['Версия 1', 'Версия 2', 'Версия 3']}
			  currentValue={values.third}
			  onChange={handleChange}
			  name="third"
			/>
			<Select
			  label="Четвертый селект"
			  options={['Статус 1', 'Статус 2', 'Статус 3']}
			  currentValue={values.fourth}
			  onChange={handleChange}
			  name="fourth"
			/>
		  </div>
  
		  /* Блок с текущими значениями
		  <div style={{ 
			marginTop: '20px',
			padding: '15px',
			backgroundColor: '#f5f5f5',
			borderRadius: '6px'
		  }}>
			<h4>Текущие значения:</h4>
			<ul>
			  {Object.entries(values).map(([name, value]) => (
				<li key={name}>
				  <strong>{name}:</strong> {value || 'не выбрано'}
				</li>
			  ))}
			</ul>
		  </div>
		</div>
	  );
	},
  };
 */ 