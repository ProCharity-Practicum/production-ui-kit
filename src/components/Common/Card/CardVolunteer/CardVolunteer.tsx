import clsx from 'clsx';
import styles from './CardVolunteer.module.scss';
import { Card } from '@/components/Common/Card/Card.tsx';
import { UserTaggedMedium } from '@/components/Common/User/UserTaggedMedium/UserTaggedMedium.tsx';
import { ButtonOutline } from '@/components/Common/Button';
import { Seniority } from '@/components/Common/User/types.ts';
import { pluralize } from '@/utils.ts';

export type CardVolunteerProps = {
	className?: string;
	user: {
		name: string;
		grade?: Seniority;
		location?: string;
		activity: number;
		categoryTasks: number;
		totalTasks: number;
	};
};

export function CardVolunteer({ className, user }: CardVolunteerProps) {
	return (
		<Card className={clsx(styles.container, className)}>
			<Card.Row>
				<UserTaggedMedium
					title={'Test user'}
					grade={'junior'}
					infoText={'Москва'}
				/>
			</Card.Row>

			<Card.Activity
				items={{
					['Участник проекта']: !user.activity
						? 'первый год'
						: pluralize(user.activity, ['год', 'года', 'лет'], true),
				}}
			/>

			<Card.Totals
				items={{
					['Задач выполнено в данной категории']: [
						user.categoryTasks,
						'primary',
					],
					['Задач всего']: [user.totalTasks, 'secondary'],
				}}
			/>

			<Card.Actions>
				<ButtonOutline>Выбрать</ButtonOutline>
				<ButtonOutline>Отказать</ButtonOutline>
			</Card.Actions>
		</Card>
	);
}
