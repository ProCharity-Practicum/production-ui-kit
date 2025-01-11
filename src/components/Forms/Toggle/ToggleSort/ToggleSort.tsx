import { useState } from 'react';
import styles from './ToggleSort.module.scss';
import vectorGray from '../assets/icon_vector_gray.svg';
import vectorBlack from '../assets/icon_vector_black.svg';

export type ToggleSortProps = {
	title: string;
	onChange?: () => void;
};

export function ToggleSort({ title, onChange = () => {} }: ToggleSortProps) {
	const [sort, setSort] = useState(false);
	const [active, setActive] = useState(false);

	const handleSort = () => {
		onChange();
		if (active) {
			if (!sort) {
				setActive(false);
			} else {
				setSort(!sort);
			}
		} else {
			setActive(true);
			setSort(!sort);
		}
	};

	return (
		<div
			className={`${styles.head} ${active && styles.head_active}`}
			onClick={handleSort}
			data-testid="ToggleSort"
		>
			<div className={`${styles.text} ${active && styles.text_active}`}>
				{title}
			</div>
			<div className={styles.containerVectors}>
				<img
					className={styles.vectorUp}
					src={sort && active ? vectorBlack : vectorGray}
					alt="Меню"
				/>
				<img
					className={styles.vectorDown}
					src={!sort && active ? vectorBlack : vectorGray}
					alt="Меню"
				/>
			</div>
		</div>
	);
}
