import { useState } from 'react';
import styles from './SortBlock.module.scss';
import { ToggleSort } from '@/components/Forms/Toggle/ToggleSort/ToggleSort';

type SortDirection = 'asc' | 'desc';

export type SortOption = {
	label: string; // Кириллица для отображения
	value: string; // Латиница для параметров
};

export type SortBlockProps = {
	count: number;
	total: number;
	sortOptions: SortOption[];
	onSortChange: (option: { value: string; direction: SortDirection }) => void;
	filled?: boolean;
};

export function SortBlock({
	count,
	total,
	sortOptions,
	onSortChange,
	filled = false,
}: SortBlockProps) {
	const [activeSort, setActiveSort] = useState<{
		value: string;
		direction: SortDirection;
	} | null>(null);

	const handleSortChange = (value: string, direction: SortDirection) => {
		const newSort = { value, direction };
		setActiveSort(newSort);
		onSortChange(newSort);
	};

	return (
		<div className={styles.sortBlock}>
			<div
				className={`${styles.counter} ${filled ? styles.counterFilled : ''}`}
			>
				<span className={`${filled ? styles.filled : ''}`}>{count}</span>
				<span> из {total}</span>
			</div>

			<div className={styles.sortContainer}>
				<span className={styles.sortLabel}>Сортировать по:</span>
				<div className={styles.sortButtons}>
					{sortOptions.map((option) => (
						<ToggleSort
							key={option.value}
							id={option.value}
							title={option.label}
							direction={
								activeSort?.value === option.value
									? activeSort.direction
									: 'none'
							}
							onChange={(id, dir) => {
								if (dir !== 'none') {
									handleSortChange(id, dir);
								}
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
