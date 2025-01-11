import styles from './SectionNotificationChannel.module.scss';
import { ToggleNotification } from '../ToggleNotification/ToggleNotification';

export type SectionNotificationChannelProps = {
	currentChannel?: 'telegram' | 'email';
	variant:
		| 'profile'
		| 'profileCompany'
		| 'currentTasksFund'
		| 'currentTasksVolunteer'
		| 'proCharityFund'
		| 'proCharityVolunteer'
		| 'proCharityCompany'
		| 'employees'
		| 'newTasks'
		| 'newTasksCompany';
	children?: React.ReactNode;
};

export function SectionNotificationChannel({
	currentChannel,
	children,
	variant,
}: SectionNotificationChannelProps) {
	const hasBodyText = variant === 'newTasks';

	const renderTitle = () => {
		if (variant === 'profile' || variant === 'profileCompany')
			return 'О профиле';
		else if (
			variant === 'currentTasksFund' ||
			variant === 'currentTasksVolunteer'
		)
			return 'О текущих задачах';
		else if (
			variant === 'proCharityFund' ||
			variant === 'proCharityVolunteer' ||
			variant === 'proCharityCompany'
		)
			return 'О ProCharity';
		else if (variant === 'employees') return 'О сотрудниках';
		else if (variant === 'newTasks') return 'О новых задачах';
		else if (variant === 'newTasksCompany')
			return 'О новых задачах по компетенциям сотрудников';
	};

	const renderBodyText = () => {
		switch (variant) {
			case 'profile':
				return 'Сообщения о прохождении модерации, смене статуса профиля или пароля';
			case 'profileCompany':
				return 'Сообщения о прохождении модерации, смене статуса профиля или пароля';
			case 'currentTasksVolunteer':
				return 'Все уведомления по задачам, на которые ты откликнулся. От подтверждения тебя исполнителем до получения бонусных баллов';
			case 'currentTasksFund':
				return 'Все уведомления от рекомендаций модератора по формулировке задачи до отзыва волонтера о вашей совместной работе';
			case 'proCharityFund':
				return 'Приглашения на мероприятия и опросы, уведомления об обновлении функционала площадки. Такие сообщения будут приходить нечасто. Ваше участие в опросах поможет нам делать платформу более удобной';
			case 'proCharityVolunteer':
				return 'Приглашения на мероприятия и опросы, уведомления об обновлении функционала площадки. Такие сообщения будут приходить нечасто. Твое участие в опросах поможет нам делать платформу более удобной';
			case 'proCharityCompany':
				return 'Приглашения на мероприятия и опросы, уведомления об обновлении функционала площадки. Такие сообщения будут приходить нечасто. Участие в опросах поможет нам делать платформу более удобной';
			case 'employees':
				return 'Оповещения о сотрудниках, которые присоединились к ProCharity или удалили свой аккаунт';
		}
	};

	return (
		<section
			className={styles.container}
			data-testid="SectionNotificationChannel"
		>
			<div className={styles.wrapper}>
				<h3 className={styles.title}>{renderTitle()}</h3>
				{currentChannel && (
					<ToggleNotification currentChannel={currentChannel} />
				)}
			</div>
			{!hasBodyText && <p className={styles.body}>{renderBodyText()}</p>}
			{children}
		</section>
	);
}
