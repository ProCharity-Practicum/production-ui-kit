import styles from './UserVolunterLarge.module.scss';
import { Icon } from '@/components/Core/Icon';
import {
	Avatar,
	AvatarProps,
} from '@/components/Common/User/Avatar/Avatar.tsx';
import clsx from 'clsx';
import { ButtonOutline, ButtonTag } from '@/components/Common/Button';

export type UserVolunterLargeProps = {
	title: string;
	location: string;
	registrationDate: string;
	workPlace: string;
	image?: AvatarProps['image'];
	companyLogo?: AvatarProps['image'];
	isFavorite?: boolean;
	onClickTelegram?: () => void;
	telegram?: string;
	onClickEmail?: () => void;
	email?: string;
};

export function UserVolunterLarge({
	title,
	location,
	registrationDate,
	workPlace,
	image,
	companyLogo,
	isFavorite,
	onClickTelegram,
	onClickEmail,
	telegram,
	email,
}: UserVolunterLargeProps) {
	const telegramProps = onClickTelegram
		? { onClick: onClickTelegram }
		: telegram
			? { href: `https://t.me/${telegram}`, Tag: 'a' as ButtonTag }
			: null;

	const emailProps = onClickEmail
		? { onClick: onClickEmail }
		: telegram
			? { href: `mailto:${email}`, Tag: 'a' as ButtonTag }
			: null;

	return (
		<div className={styles.container} data-testid="UserVolunterLarge">
			<Avatar className={styles.image} image={image} alt={title} />
			{isFavorite && (
				<figure className={clsx(styles.statusImage, styles.circle)}>
					<Icon name="favorVolunteers" color="white" />
				</figure>
			)}
			<div className={styles.infoBlock}>
				<h2 className={styles.title}>{title}</h2>
				<div className={styles.infoForUser}>
					<div className={styles.infoDate}>
						<p className={styles.infoText}>
							Месторасположение: <b>{location}</b>
						</p>
						<p className={styles.infoText}>
							Дата регистрации: <b>{registrationDate}</b>
						</p>
					</div>
					<div className={styles.infoWork}>
						<Avatar
							className={styles.imageWorkPlace}
							image={companyLogo}
							alt={workPlace}
						/>
						<p className={styles.infoText}>
							Работает в <br /> <b>{workPlace}</b>
						</p>
					</div>
					<div className={styles.infoSocial}>
						{telegramProps && (
							<ButtonOutline
								icon="socialLogo"
								className={styles.icon}
								{...telegramProps}
							/>
						)}
						{emailProps && (
							<ButtonOutline
								icon="email"
								className={styles.icon}
								{...emailProps}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
