import clsx from 'clsx';
import styles from './Tabs.module.scss';

export type TabsProps = {
	value: number;
	options: string[];
	onChange: (index: number) => void;
};

export function Tabs({ value, options, onChange }: TabsProps) {
	const handleClick = (index: number) => {
		onChange(index);
	};

	return (
		<div className={clsx(styles.container)} data-testid="Tabs">
			{options.map((tab, index) => (
				<button
					key={index}
					className={clsx(styles.tab, {
						[styles.active]: index === value,
					})}
					onClick={() => handleClick(index)}
				>
					{tab}
				</button>
			))}
		</div>
	);
}
