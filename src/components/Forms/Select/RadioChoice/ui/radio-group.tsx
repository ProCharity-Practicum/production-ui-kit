import { RadioChoiceProps } from '../types';
import style from '../style.module.scss';
import { Option } from './option';

export function RadioGroup({
	name,
	selected,
	onChange,
	state,
	array,
	setCurrentValue,
	isButtonLike,
}: RadioChoiceProps) {
	return (
		<div className={style.container} data-testid={`radio-group`}>
			<div className={style[state as keyof typeof style]}>
				{array?.map(({ value, title }) => (
					<Option
						key={value}
						groupName={name}
						value={value}
						title={title}
						selected={selected}
						onChange={onChange}
						setCurrentValue={setCurrentValue}
						isButtonLike={isButtonLike}
					/>
				))}
			</div>
		</div>
	);
}
