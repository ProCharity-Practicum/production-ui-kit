import styles from './CardCompany.module.scss';
import { age } from '@/utils.ts';
import { Card } from '@/components/Common/Card/Card.tsx';
import clsx from 'clsx';
import { UserLarge } from '@/components/Common/User/UserLarge/UserLarge.tsx';

import { Shape } from '@/components/Common/User';

export type CardCompanyProps = {
	title: string;
	image?: string;
	ageInProject?: number;
	help?: number;
	task?: number;
	className?: string;
};

export function CardCompany({
	title,
	image,
	ageInProject = 0,
	help,
	task,
	className,
}: CardCompanyProps) {
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
					['Участник проекта']: age(ageInProject),
				}}
			/>

			<Card.Totals
				items={{
					['фондам помогли']: [help ?? 0, 'primary'],
					['задач выполнено']: [task ?? 0, 'secondary'],
				}}
			/>
		</Card>
	);
}
