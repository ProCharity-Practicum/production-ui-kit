import styles from './UserTaggedMedium.module.scss';
import { Icon } from '@/components/Core/Icon';
import {
	Avatar,
	AvatarProps,
} from '@/components/Common/User/Avatar/Avatar.tsx';
import { Seniority } from '@/components/Common/User/types.ts';
import clsx from 'clsx';

export type UserTaggedMediumProps = {
	title: string;
	image?: AvatarProps['image'];
	grade?: Seniority;
	infoText?: string;
};

export function UserTaggedMedium({
	title,
	grade,
	infoText,
	image,
}: UserTaggedMediumProps) {
	return (
		<div className={styles.container} data-testid="UserTaggedMedium">
			<Avatar className={styles.image} image={image} alt={title} />
			<div className={styles.infoBlock}>
				<h2 className={styles.title}>{title}</h2>

				{grade && (
					<div className={clsx(styles.grade, styles[grade])}>
						<span className={styles.text}>{grade}</span>
						<Icon name="procharity" size={16} />
					</div>
				)}

				<p className={styles.infoText}>{infoText}</p>
			</div>
		</div>
	);
}
