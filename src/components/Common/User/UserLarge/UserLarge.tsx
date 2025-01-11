import clsx from 'clsx';
import styles from './UserLarge.module.scss';
import {
	Avatar,
	AvatarProps,
} from '@/components/Common/User/Avatar/Avatar.tsx';
import { Seniority } from '@/components/Common/User/types.ts';
import { Shape } from '@/components/Common/User';

export type UserLargeProps = {
	title: string;
	seniority?: Seniority;
	image?: string;
	shape?: AvatarProps['shape'];
	infoTextUp?: string;
	infoTextDown?: string;
	className?: string;
};

export function UserLarge({
	title,
	seniority,
	image,
	shape = Shape.Circle,
	infoTextUp,
	infoTextDown,
	className,
}: UserLargeProps) {
	return (
		<div className={clsx(styles.container, className)} data-testid="User">
			<Avatar
				className={clsx(styles.image, seniority ? styles[seniority] : null)}
				image={image}
				shape={shape}
				alt={title}
			/>
			<div className={styles.infoBlock}>
				<p className={styles.infoText}>{infoTextUp}</p>
				<h2 className={styles.title}>{title}</h2>
				<p className={`${styles.infoText} ${styles.infoText__infoTextDown}`}>
					{infoTextDown}
				</p>
			</div>
		</div>
	);
}
