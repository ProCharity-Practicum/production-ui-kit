import styles from './UserFundLarge.module.scss';
import { Icon } from '@/components/Core/Icon';
import { Avatar } from '@/components/Common/User/Avatar/Avatar.tsx';
import { Shape } from '@/components/Common/User';

export type UserFundLargeProps = {
	title: string;
	infoText?: string;
	image?: string;
	linkText?: string;
	onClick: () => void;
};

export function UserFundLarge({
	title,
	infoText,
	image,
	linkText,
	onClick,
}: UserFundLargeProps) {
	return (
		<div className={styles.container} data-testid="UserFundLarge">
			<Avatar
				className={styles.image}
				image={image}
				shape={Shape.Square}
				alt={title}
			/>
			<div className={styles.infoBlock}>
				<h2 className={styles.title}>{title}</h2>
				<div className={styles.infoBlock__subtitle}>
					<div className={styles.infoBlock__subtitle__data}>
						<Icon name="marker" />
						<p className={styles.infoText}>{infoText}</p>
					</div>
					<div className={styles.infoBlock__subtitle__data}>
						<Icon name="link" />
						<a className={styles.link} onClick={onClick}>
							{linkText}
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
