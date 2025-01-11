import styles from './CardContentItem.module.scss';
import { Icon } from '@/components/Core/Icon';
import { Card } from '@/components/Common/Card/Card.tsx';
import { Title, Text } from '@/components/Core/Typography';

export type CardContentItemProps = {
	title: string;
	text: string;
	onClick: () => void;
};

export function CardContentItem({
	title,
	text,
	onClick,
}: CardContentItemProps) {
	return (
		<Card className={styles.container}>
			<Card.Row>
				<Title className={styles.title} Tag="h3">
					{title}
				</Title>
			</Card.Row>
			<Card.Row className={styles.infoBlock}>
				<Text className={styles.text}>{text}</Text>
				<div className={styles.image} onClick={onClick}>
					<Icon name="arrowRight" />
				</div>
			</Card.Row>
		</Card>
	);
}
