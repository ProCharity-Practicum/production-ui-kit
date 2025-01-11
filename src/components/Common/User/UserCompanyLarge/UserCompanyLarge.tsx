import styles from './UserCompanyLarge.module.scss';
import { Icon } from '@/components/Core/Icon';
import {
	Avatar,
	AvatarProps,
} from '@/components/Common/User/Avatar/Avatar.tsx';
import { Shape } from '@/components/Common/User';

export type UserCompanyLargeProps = {
	title: string;
	image?: AvatarProps['image'];
	linkText?: string;
	onClick: () => void;
};

export function UserCompanyLarge({
	title,
	image,
	linkText,
	onClick,
}: UserCompanyLargeProps) {
	return (
		<div className={styles.container} data-testid="UserCompanyLarge">
			<Avatar
				className={styles.image}
				image={image}
				shape={Shape.Square}
				alt={title}
			/>
			<div className={styles.infoBlock}>
				<h2 className={styles.title}>{title}</h2>
				<div className={styles.infoBlock__subtitle}>
					<Icon name="link" />
					<a className={styles.link} onClick={onClick}>
						{linkText}
					</a>
				</div>
			</div>
		</div>
	);
}
