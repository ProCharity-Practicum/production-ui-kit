import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Select, SelectProps } from './Select';
import { useState } from 'react';


type Option = string | object;

const meta = {
	title: 'Forms/Select',
	component: Select,
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

interface CityOption {
  id: string;
  name: string;
}

interface UserOption {
  id: string;
  username: string;
  email: string;
}

// Обертка для контролируемого состояния
const SelectWithState = <T extends string | object>(props: Omit<SelectProps, 'value' | 'onChange'>) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const [value, setValue] = useState<T | ''>(props.value || '');
  
  return (
    <Select
      {...props}
      value={value}
      onChange={(option) => {
        setValue(option as T);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        props.onChange?.(option, props.name);
      }}
    />
  );
};

export const StringOptions: StoryObj<SelectProps> = {
  render: (args) => <SelectWithState<string> {...args} />,
  args: {
    label: 'Выберите вариант',
    options: ['Option 1', 'Option 2', 'Option 3'],
    optionLabel: '', // Для строк не используется
    name: 'string-select',
    onChange: fn(),
  },
};

export const ObjectOptions: StoryObj<SelectProps> = {
  render: (args) => <SelectWithState<CityOption> {...args} />,
  args: {
    label: 'Выберите город',
    options: [
      { id: '1', name: 'Москва' },
      { id: '2', name: 'Санкт-Петербург' },
      { id: '3', name: 'Казань' },
    ],
    optionLabel: 'name',
    name: 'city-select',
    onChange: fn(),
  },
};

export const WithDefaultValue: StoryObj<SelectProps> = {
  render: (args) => <SelectWithState<UserOption> {...args} />,
  args: {
    label: 'Выберите пользователя',
    options: [
      { id: '1', username: 'Иван', email: 'ivan@test.com' },
      { id: '2', username: 'Мария', email: 'maria@test.com' },
      { id: '3', username: 'Алексей', email: 'alex@test.com' },
    ],
    optionLabel: 'username',
    value: { id: '2', username: 'Мария', email: 'maria@test.com' },
    name: 'user-select',
    onChange: fn(),
  },
};

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		style={{
			maxWidth: '800px',
			padding: '20px',
			background: '#fff',
			borderRadius: '8px',
		}}
	>
		{children}
	</div>
);

const Row = ({ children }: { children: React.ReactNode }) => (
	<div style={{ display: 'flex', gap: '16px', margin: '16px 0' }}>
		{children}
	</div>
);

export const MultipleSelects: Story = {
  args: {
    label: '',
    options: [],
    optionLabel: '',
    onChange: fn(),
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [values, setValues] = useState({
      product: null as unknown as Option,
      city: null as unknown as Option,
      color: null as unknown as Option,
      size: null as unknown as Option,
      material: null as unknown as Option,
    });

    const handleChange = (field: keyof typeof values) => (selectedOption: Option) => {
      setValues(prev => ({ ...prev, [field]: selectedOption }));
    };

    return (
      <Container>
        {/* 1. Селект с объектами (продукты) */}
        <Select
          label="Продукт"
          options={[
            { name: 'Ноутбук', value: 'laptop' },
            { name: 'Смартфон', value: 'phone' },
            { name: 'Планшет', value: 'tablet' }
          ]}
          optionLabel="name"
          value={values.product}
          onChange={handleChange('product')}
          name="productSelect"
        />

        {/* 2. Селект с объектами (города) */}
        <Row>
          <Select
            label="Город"
            options={[
              { title: 'Москва', value: 'moscow' },
              { title: 'Санкт-Петербург', value: 'spb' },
              { title: 'Казань', value: 'kazan' }
            ]}
            optionLabel="title"
            value={values.city}
            onChange={handleChange('city')}
            name="citySelect"
          />
        </Row>

        {/* 3. Селект со строками (цвета) */}
        <Row>
          <Select
            label="Цвет"
            options={['Красный', 'Синий', 'Зеленый']}
            optionLabel="any"
            value={values.color}
            onChange={handleChange('color')}
            name="colorSelect"
          />

          {/* 4. Селект со строками (размеры) */}
          <Select
            label="Размер"
            options={['S', 'M', 'L', 'XL']}
            optionLabel="any"
            value={values.size}
            onChange={handleChange('size')}
            name="sizeSelect"
          />
        </Row>

        {/* 5. Селект со строками (материалы) */}
        <div style={{ width: '400px' }}>
          <Select
            label="Материал"
            options={['Хлопок', 'Полиэстер', 'Шерсть']}
            optionLabel="any"
            value={values.material}
            onChange={handleChange('material')}
            name="materialSelect"
          />
        </div>

        {/* Блок с текущими значениями */}
        <div style={{ 
          marginTop: '24px', 
          padding: '16px', 
          background: '#f5f5f5', 
          borderRadius: '4px',
          fontFamily: 'monospace'
        }}>
          <h4>Текущие значения:</h4>
          <pre>{JSON.stringify(values, (key, value) => {
            if (value === null) return 'null';
            if (typeof value === 'string') return value;
            return JSON.stringify(value);
          }, 2)}</pre>
        </div>
      </Container>
    );
  }
};
