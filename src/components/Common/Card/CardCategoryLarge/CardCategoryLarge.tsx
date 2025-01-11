import styles from './CardCategoryLarge.module.scss';
import { Card } from '@/components/Common/Card/Card.tsx';
import clsx from 'clsx';
import { Avatar } from '@/components/Common/User/Avatar/Avatar.tsx';
import { pluralize } from '@/utils.ts';
import { Title, Text } from '@/components/Core/Typography';
import { Shape } from '@/components/Common/User/Avatar/Shape.tsx';

export type CardCategoryLargeProps = {
	title: string;
	image?: string;
	text?: string;
	amount?: number;
	className?: string;
};

export function CardCategoryLarge({
	title,
	image,
	text,
	amount = 0,
	className,
}: CardCategoryLargeProps) {
	const tasks = (value: number) =>
		pluralize(value, [
			'задача ждёт исполнителя',
			'задачи ждут исполнителя',
			'задач ждут исполнителя',
		]);

	return (
		<Card className={clsx(styles.container, className)}>
			<Card.Row className={styles.header}>
				<Title className={styles.title} Tag="h3">
					{title}
				</Title>
				<Avatar className={styles.image} image={image} shape={Shape.Square} />
			</Card.Row>

			<Card.Row>
				<Text>{text}</Text>
			</Card.Row>

			<Card.Row className={styles.stat}>
				<span className={styles.amount}>{amount}</span>
				<span className={styles.label}>{tasks(amount)}</span>
			</Card.Row>
		</Card>
	);
}
