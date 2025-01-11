import styles from './CardCompanyVolunteer.module.scss';
import { UserTaggedMedium } from '../../User/UserTaggedMedium/UserTaggedMedium';
import { ButtonOutline } from '@/components/Common/Button';
import { Card } from '@/components/Common/Card/Card.tsx';
import { Seniority } from '@/components/Common/User/types.ts';
import clsx from 'clsx';

export type CardCompanyVolunteerProps = {
	user: {
		name: string;
		grade?: Seniority;
		location?: string;
		registered: string;
		moderated: string;
		current: number;
		completed: number;
		funds: number;
		hours: number;
	};
	className?: string;
};

export function CardCompanyVolunteer({
	className,
	user,
}: CardCompanyVolunteerProps) {
	return (
		<Card className={clsx(styles.container, className)}>
			<Card.Row>
				<UserTaggedMedium
					title={'Test user'}
					grade={'junior'}
					infoText={'Москва'}
				/>
			</Card.Row>

			<Card.State registered={user.registered} moderated={user.moderated} />

			<Card.Work
				current={user.current}
				completed={user.completed}
				funds={user.funds}
				hours={user.hours}
			/>

			<Card.Actions>
				<ButtonOutline>Удалить</ButtonOutline>
			</Card.Actions>
		</Card>
	);
}
