import { Button, ButtonVariant } from '@/components/Common/Button';
import { Icon } from '@/components/Core/Icon';

import styles from './CardFundStaff.module.scss';
import plugImage from '@/assets/images/img_chess_512.png';
import { Card } from '@/components/Common/Card/Card.tsx';
import clsx from 'clsx';
import { UserLarge } from '@/components/Common/User/UserLarge/UserLarge.tsx';
import { Text, TextVariants } from '@/components/Core/Typography';
import { Shape } from '@/components/Common/User';

export type CardFundStaffProps = {
	title: string;
	image?: string;
	link?: string;
	textData?: string;
	textLocation?: string;
	onClick?: () => void;
	className?: string;
};

export function CardFundStaff({
	title,
	image = plugImage,
	link,
	textData,
	textLocation,
	onClick,
	className,
}: CardFundStaffProps) {
	return (
		<Card className={clsx(styles.container, className)}>
			<Card.Row className={styles.user} border={[false, true]}>
				<UserLarge title={title} image={image} shape={Shape.Square} />
			</Card.Row>

			<Card.Row className={styles.info}>
				<Icon name="attachment" size={24} />
				<a className={styles.link} onClick={onClick}>
					{link}
				</a>
			</Card.Row>

			<Card.Row className={styles.info}>
				<Icon name="profile" />
				<Text>{textData}</Text>
			</Card.Row>

			<Card.Row className={styles.info}>
				<Icon name="marker" />
				<Text>{textLocation}</Text>
			</Card.Row>

			<Card.Actions className={styles.cta}>
				<Text variant={TextVariants.Caption}>Поддержите проекты фонда</Text>
				<Button variant={ButtonVariant.Outline} className={styles.button}>
					Пожертвовать
				</Button>
			</Card.Actions>
		</Card>
	);
}
