import styles from './CardNumbers.module.scss';

export type CardNumbersProps = {
	title: number;
	text: string;
};

export function CardNumbers({ title, text }: CardNumbersProps) {
	return (
		<div className={styles.container} data-testid="CardNumbers">
			<h2 className={styles.title}>{title}</h2>
			<p className={styles.text}>{text}</p>
		</div>
	);
}
