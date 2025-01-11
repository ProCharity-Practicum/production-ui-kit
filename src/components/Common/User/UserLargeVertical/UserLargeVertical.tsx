import styles from './UserLargeVertical.module.scss';
import {
	Avatar,
	AvatarProps,
} from '@/components/Common/User/Avatar/Avatar.tsx';
import clsx from 'clsx';
import { UserAlignment } from '@/components/Common/User/types.ts';
import { Shape } from '@/components/Common/User';

export type UserLargeVerticalProps = {
	title: string;
	align?: UserAlignment;
	infoText?: string;
	shape: Shape;
	image?: AvatarProps['image'];
	className?: string;
};

export function UserLargeVertical({
	title,
	infoText,
	image,
	align = UserAlignment.Right,
	shape = Shape.Circle,
	className,
}: UserLargeVerticalProps) {
	return (
		<div
			className={clsx(styles.container, className, styles[align])}
			data-testid="UserLargeVertical"
		>
			<Avatar
				className={styles.image}
				image={image}
				shape={shape}
				alt={title}
			/>

			<h2 className={styles.title}>{title}</h2>
			<p className={styles.infoText}>{infoText}</p>
		</div>
	);
}
