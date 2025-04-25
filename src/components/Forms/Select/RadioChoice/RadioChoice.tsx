import { useState, useEffect } from 'react';
import { RadioChoiceProps } from './types';
import { RadioGroup } from './ui/radio-group';

export function RadioChoice({
	state,
	array,
	selected,
	onChange,
	name,
	isButtonLike,
}: RadioChoiceProps) {
	const [currentValue, setCurrentValue] = useState(selected);

	useEffect(() => {
		setCurrentValue(selected);
	}, [selected]);

	return (
		<RadioGroup
			array={array}
			state={state}
			selected={currentValue}
			name={name}
			onChange={onChange}
			setCurrentValue={setCurrentValue}
			isButtonLike={isButtonLike}
		/>
	);
}
