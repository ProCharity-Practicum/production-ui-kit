import styles from './CardVolunteer.module.scss';
import { age } from '@/utils.ts';
import { Card } from '@/components/Common/Card/Card.tsx';
import clsx from 'clsx';
import { UserLarge } from '@/components/Common/User/UserLarge/UserLarge.tsx';

import { Shape } from '@/components/Common/User';
import { Anchor } from '@/components/Core/Anchor/Anchor';

export type CardCompanyProps = {
	title: string;
	location: string;
	image: string;
	ageInProject: number;
	lastVisit: string;
	task: number;
	className?: string;
	href?: string;
};

export function CardVolunteerList({
	title,
	location,
	image,
	ageInProject = 0,
	lastVisit,
	task,
	className,
	href,
}: CardCompanyProps) {
	const cardContent = (
		<Card className={clsx(styles.container, className)}>
			<Card.Row>
				<UserLarge
					className={styles.user}
					infoTextDown={location}
					title={title}
					image={image}
					shape={Shape.Circle}
				/>
			</Card.Row>

			<Card.Activity
				items={{
					['Участник проекта']: age(ageInProject),
					['Последнее посещение']: lastVisit,
				}}
			/>

			<Card.Totals
				items={{
					['задач выполнено']: [task ?? 0, 'primary'],
				}}
			/>
		</Card>
	);
	if (href) {
		return (
			<Anchor href={href} className={styles.anchorWrapper}>
				{cardContent}
			</Anchor>
		);
	}
	return cardContent;
}
