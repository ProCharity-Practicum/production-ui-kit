import styles from './User.module.scss';
import {
	Avatar,
	AvatarProps,
} from '@/components/Common/User/Avatar/Avatar.tsx';
import { Shape } from '@/components/Common/User/Avatar/Shape.tsx';

export type UserProps = {
	title: string;
	shape?: Shape;
	image?: AvatarProps['image'];
	afterText?: string;
	beforeText?: string;
};

export function User({
	title,
	shape = Shape.Circle,
	afterText,
	image,
	beforeText,
}: UserProps) {
	return (
		<div className={styles.container} data-testid="User">
			<Avatar image={image} shape={shape} alt={title} />
			<div className={styles.infoBlock}>
				<p className={styles.infoText}>{beforeText}</p>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.infoText}>{afterText}</p>
			</div>
		</div>
	);
}
