import styles from './ToggleSort.module.scss';
import vectorGray from '../assets/icon_vector_gray.svg';
import vectorBlack from '../assets/icon_vector_black.svg';

export type SortDirection = 'none' | 'asc' | 'desc';

export type ToggleSortProps = {
	id: string;
	title: string;
	direction: SortDirection;
	onChange: (id: string, direction: SortDirection) => void;
	disabled?: boolean;
};

export function ToggleSort({
	id,
	title,
	direction,
	onChange,
	disabled = false,
}: ToggleSortProps) {
	const handleClick = () => {
		if (disabled) return;

		const newDirection: SortDirection =
			direction === 'none' ? 'asc' : direction === 'asc' ? 'desc' : 'asc'; // После desc снова asc

		onChange(id, newDirection);
	};

	return (
		<button
			type="button"
			className={`${styles.head} ${direction !== 'none' && styles.head_active} ${
				disabled && styles.head_disabled
			}`}
			onClick={handleClick}
			disabled={disabled}
			aria-pressed={direction !== 'none'}
			aria-label={`${title}, ${
				direction === 'asc'
					? 'по возрастанию'
					: direction === 'desc'
						? 'по убыванию'
						: 'не активно'
			}`}
		>
			<div
				className={`${styles.text} ${direction !== 'none' && styles.text_active}`}
			>
				{title}
			</div>
			<div className={styles.containerVectors}>
				<img
					className={styles.vectorUp}
					src={direction === 'asc' ? vectorBlack : vectorGray}
					alt=""
					aria-hidden="true"
				/>
				<img
					className={styles.vectorDown}
					src={direction === 'desc' ? vectorBlack : vectorGray}
					alt=""
					aria-hidden="true"
				/>
			</div>
		</button>
	);
}
