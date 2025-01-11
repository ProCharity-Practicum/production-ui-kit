import clsx from 'clsx';
import debounce from 'lodash/debounce';
import styles from './InputMultipleLinks.module.scss';
import {
	InputCustomLink,
	LinkValue,
} from '@/components/Forms/Input/InputLink/InputCustomLink/InputCustomLink.tsx';
import { AddLink, ButtonLinkVariant } from '@/components/Common/Button';

export type InputMultipleLinksProps = {
	className?: string;
	value: LinkValue[];
	onChange: (value: LinkValue[]) => void;
	name?: string;
};

const EMPTY = { name: '', link: '' };

export function InputMultipleLinks({
	className,
	value,
	onChange,
	name,
}: InputMultipleLinksProps) {
	const onAddLink = () => {
		const lastItem = value[value.length - 1];
		if (lastItem && (lastItem.name !== '' || lastItem.link !== '')) {
			onChange([...value, EMPTY]);
		}
	};

	const changeHandler = debounce(onChange, 750);

	const onChangeLink = (index: number) => (data: LinkValue) => {
		changeHandler(value.toSpliced(index, 1, data));
	};

	return (
		<div
			className={clsx(styles.container, className)}
			data-testid="InputMultipleLinks"
		>
			{(value.length ? value : [EMPTY]).map((item, index) => (
				<InputCustomLink
					key={`${item.name}_${index}`}
					value={item}
					className={styles.link}
					name={name}
					onChange={onChangeLink(index)}
				/>
			))}
			<AddLink onClick={onAddLink} variant={ButtonLinkVariant.Button} />
		</div>
	);
}
