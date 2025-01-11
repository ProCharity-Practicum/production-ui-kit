import styles from './CardFund.module.scss';
import plugImage from '@/assets/images/img_chess_512.png';
import { Card } from '@/components/Common/Card/Card.tsx';
import { UserLarge } from '@/components/Common/User/UserLarge/UserLarge.tsx';
import { age } from '@/utils.ts';
import clsx from 'clsx';
import { Shape } from '@/components/Common/User/Avatar/Shape.tsx';

export type CardFundProps = {
	title: string;
	image?: string;
	ageInProject?: number;
	currentTasks?: number;
	completedTasks?: number;
	className?: string;
};

export function CardFund({
	title,
	image = plugImage,
	ageInProject,
	currentTasks,
	completedTasks,
	className,
}: CardFundProps) {
	return (
		<Card className={clsx(styles.container, className)}>
			<Card.Row>
				<UserLarge
					className={styles.user}
					title={title}
					image={image}
					shape={Shape.Square}
				/>
			</Card.Row>

			<Card.Activity
				items={{
					['Участник проекта']: age(ageInProject ?? 0),
				}}
			/>

			<Card.Totals
				items={{
					['Задач ждут исполнителей']: [currentTasks ?? 0, 'primary'],
					['Задач закрыто']: [completedTasks ?? 0, 'secondary'],
				}}
			/>
		</Card>
	);
}
