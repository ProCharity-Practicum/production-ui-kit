import { UserLarge } from '@/components/Common/User/UserLarge/UserLarge';
import styles from './CardTask.module.scss';
import { DiamondTag, Tag, ViewsTag } from '@/components/Common/Tag/Tag.tsx';
import {
	isObjectTag,
	isStringTag,
	TagColor,
} from '@/components/Common/Tag/types.ts';
import { ReactNode } from 'react';
import { Card, CardProps } from '@/components/Common/Card/Card.tsx';
import clsx from 'clsx';
import { Title } from '@/components/Core/Typography';

import { Shape } from '@/components/Common/User';
import { Anchor } from '@/components/Core/Anchor/Anchor';

export interface TaskData {
	name: string;
	category: string;
	views?: number;
	profit?: number;
	dueDate?: string;
	location?: string;
	tags?: (string | { value: string; color: TagColor })[];
	user?: {
		avatarUrl?: string;
		title: string;
		infoTextUp?: string;
		infoTextDown?: string;
		shape?: Shape;
		seniority?: 'junior' | 'middle' | 'senior'; // если не указано — нет рамки
	};
	username?: string;
	status?: 'offers' | 'archive';
	useActualUntil?: boolean;
}

export type CardTaskProps = CardProps & {
	data: TaskData;
	actions?: ReactNode;
	href?: string;
};

export function CardTask({
	className,
	isFeatured,
	data,
	actions,
	href,
}: CardTaskProps) {
	const tagsRow = data.tags
	? data.tags
			.filter((tag) => isStringTag(tag) || isObjectTag(tag))
			.map((tag) => {
				if (isObjectTag(tag)) {
					return <Tag key={tag.value} value={tag.value} variant={tag.color} />;
				} else {
					return <Tag key={tag} value={tag} variant={TagColor.Outline} />;
				}
			})
	: [];
	const cardContent = (
		<Card className={clsx(styles.container, className)} isFeatured={isFeatured}>
			{/* === Шапка карточки === */}
			<Card.Row className={styles.headerTop}>
				<span className={styles.category}>{data.category}</span>
				<div className={styles.metrics}>
					{!!data.views && <ViewsTag value={data.views} />}
					{!!data.profit && <DiamondTag value={data.profit} />}
				</div>
			</Card.Row>

			{/* === Название задачи === */}
			<Card.Row className={styles.headerBottom}>
				<Title className={styles.title} Tag="h3">
					{data.name}
				</Title>
			</Card.Row>
			{/* === Теги === */}
			{tagsRow.length > 0 && (
        <Card.Row className={styles.tags}>{tagsRow}</Card.Row>
      )}

			{/* === Блок инфо: дата + место или пользователь === */}
			<Card.Row
				className={clsx(
					styles.info,
					data.user ? styles.infoWithUser : styles.infoWithoutAvatar
				)}
				border={[true, false]}
			>
				{data.user ? (
					<UserLarge
						image={data.user.avatarUrl}
						title={data.user.title}
						infoTextUp={data.user.infoTextUp}
						infoTextDown={data.user.infoTextDown}
						shape={data.user.shape || Shape.Circle}
						{...(data.user.seniority ? { seniority: data.user.seniority } : {})}
						status={data.status}
					/>
				) : data.status === 'archive' ? (
					<div className={styles.meta}>
						<p className={styles.metaLabel}>Задача закрыта</p>
						<h4 className={styles.metaValue}>
							{data.dueDate || 'Не установлена'}
						</h4>
						<p className={styles.metaLabel}>Волонтер-исполнитель</p>
						<h4 className={styles.metaValue}>
							{data.username || 'Исполнитель не указан'}
						</h4>
					</div>
				) : (
					<div className={styles.meta}>
						<p className={styles.metaLabel}>
							{data.useActualUntil ? 'Актуально до' : 'Дата сдачи задания'}
						</p>
						<p className={styles.metaValue}>
							{data.dueDate || 'Не установлена'}
						</p>
						<p className={styles.metaLabel}>{data.location || 'Location'}</p>
					</div>
				)}
			</Card.Row>
			{/* === Кнопки/действия === */}
			<Card.Actions className={styles.actions}>
				<div
					className={styles.actionsContainer}
					onClick={(e) => {
						e.stopPropagation();
						e.nativeEvent.stopImmediatePropagation();
					}}
				>
					{actions}
				</div>
			</Card.Actions>
		</Card>
	);

	// Оборачиваем в Anchor если есть href
	if (href) {
		return (
			<Anchor href={href} className={styles.anchorWrapper}>
				{cardContent}
			</Anchor>
		);
	}
	return cardContent;
}
