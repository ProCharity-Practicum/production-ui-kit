import { ButtonOutline } from '@/components/Common/Button';
import { UserLarge } from '@/components/Common/User/UserLarge/UserLarge';
import styles from './CardTask.module.scss';
import { DiamondTag, Tag, ViewsTag } from '@/components/Common/Tag/Tag.tsx';
import {
	isObjectTag,
	isStringTag,
	TagColor,
} from '@/components/Common/Tag/types.ts';
import { ReactElement, ReactNode } from 'react';
import { Card, CardProps } from '@/components/Common/Card/Card.tsx';
import clsx from 'clsx';
import { Title } from '@/components/Core/Typography';

import { Shape } from '@/components/Common/User';

export interface TaskShortData {
	name: string;
	category: string;
	tags?: (string | { value: string; color: TagColor })[];
	views: number;
	profit: number;
	comments: number;
	fundLogo?: string;
	dueDate: string;
	location: string;
	responses?: number;
}

export type CardTaskProps = CardProps & {
	data: TaskShortData;
	title: string;
	category?: string;
	views?: number;
	profit?: number;
	tags?: (string | { value: string; color: TagColor })[];
	responses?: number;
	comments?: number;
	actions: ReactNode;
};

export function CardTask({
	isFeatured,
	className,
	data,
	actions,
}: CardTaskProps) {
	const tagsRow: ReactElement[] = data.tags
		? data.tags
				.filter((item) => isStringTag(item) || isObjectTag(item))
				.map((tag) => {
					if (isObjectTag(tag)) {
						return (
							<Tag key={tag.value} value={tag.value} variant={tag.color} />
						);
					} else {
						return <Tag key={tag} value={tag} variant={TagColor.Outline} />;
					}
				})
		: [];

	return (
		<Card className={clsx(styles.container, className)} isFeatured={isFeatured}>
			<Card.Row className={styles.header}>
				<span className={styles.category}>{data.category}</span>
				<span className={styles.tags}>
					{!!data.views && <ViewsTag value={data.views ?? 0} />}
					{!!data.profit && <DiamondTag value={data.profit} />}
				</span>
			</Card.Row>

			<Card.Row>
				<Title className={styles.title} Tag="h3">
					{data.name}
				</Title>
			</Card.Row>

			<Card.Row className={styles.tags}>{tagsRow}</Card.Row>

			<Card.Row border={[true, false]}>
				<UserLarge
					className={styles.user}
					title={data.dueDate}
					infoTextUp="Дата сдачи задания"
					infoTextDown={data.location}
					seniority="junior"
					shape={Shape.Square}
				/>
			</Card.Row>

			<Card.Actions className={styles.responses}>
				<ButtonOutline icon="comment" counter={data.comments} />
				{!!data.responses && (
					<ButtonOutline counter={data.responses}>отклики</ButtonOutline>
				)}
				{actions}
			</Card.Actions>
		</Card>
	);
}
