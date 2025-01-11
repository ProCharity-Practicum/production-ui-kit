import clsx from 'clsx';
import styles from './Avatar.module.scss';
import plugAvatar from '@/assets/images/img_chess_512.png';
import { Shape } from '@/components/Common/User/Avatar/Shape.tsx';

export type AvatarProps = {
	className?: string;
	shape?: Shape;
	image: string | null | undefined;
	alt?: string;
};

export function Avatar({
	image,
	alt,
	className,
	shape = Shape.Circle,
}: AvatarProps) {
	return (
		<img
			data-testid="Avatar"
			src={image ? image : plugAvatar}
			onError={({ currentTarget }) => {
				currentTarget.onerror = null; // prevents looping
				currentTarget.src = plugAvatar;
			}}
			alt={alt}
			className={clsx(styles.image, className, styles[shape])}
		/>
	);
}
