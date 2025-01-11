import styles from './CardNews.module.scss';
import { Card } from '@/components/Common/Card/Card.tsx';
import { UserLargeVertical } from '@/components/Common/User/UserLargeVertical/UserLargeVertical.tsx';
import { UserAlignment } from '@/components/Common/User/types.ts';
import { Shape } from '@/components/Common/User/Avatar/Shape.tsx';

export const ShapeImage = {
	circle: 'circle',
	square: 'square',
} as const;

export type TShapeImage = keyof typeof ShapeImage;

export type CardNewsProps = {
	title: string;
	formAvatar: TShapeImage;
	infoDate?: string;
	userImage?: string;
};

export function CardNews({ title, infoDate, userImage }: CardNewsProps) {
	return (
		<Card className={styles.container}>
			<Card.Row>
				<UserLargeVertical
					image={userImage}
					className={styles.image}
					title={title}
					shape={Shape.Square}
					infoText={infoDate}
					align={UserAlignment.Left}
				/>
			</Card.Row>
		</Card>
	);
}
