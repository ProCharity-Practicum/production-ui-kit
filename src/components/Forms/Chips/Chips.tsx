import styles from './Chips.module.scss';

export type ChipsProps = {
	filters: string[];
	onDelete?: (filter: string) => void;
};

export function Chips({ filters, onDelete = () => {} }: ChipsProps) {
	return (
		<div className={styles.inputChipsBox} data-testid="Chips">
			{filters.map((filter, index) => (
				<div
					className={styles.inputChip}
					key={index}
					data-testid="Element_chips"
				>
					<p>{filter}</p>
					<button onClick={() => onDelete(filter)} className={styles.button}>
						<svg
							viewBox="0 0 16 16"
							className={styles.deleteIcon}
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M11.5333 4.96667C11.7911 5.2244 11.7911 5.64227 11.5333 5.9L8.93333 8.5L11.5333 11.1C11.7911 11.3577 11.7911 11.7756 11.5333 12.0333C11.2756 12.2911 10.8577 12.2911 10.6 12.0333L8 9.43333L5.4 12.0333C5.14227 12.2911 4.7244 12.2911 4.46667 12.0333C4.20893 11.7756 4.20893 11.3577 4.46667 11.1L7.06667 8.5L4.46667 5.9C4.20893 5.64227 4.20893 5.2244 4.46667 4.96667C4.7244 4.70893 5.14227 4.70893 5.4 4.96667L8 7.56667L10.6 4.96667C10.8577 4.70893 11.2756 4.70893 11.5333 4.96667Z" />
						</svg>
					</button>
				</div>
			))}
		</div>
	);
}
