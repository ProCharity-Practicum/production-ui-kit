import clsx from 'clsx';
import styles from './Card.module.scss';
import { FunctionComponent, ReactNode } from 'react';
import { Text, TextVariants } from '@/components/Core/Typography';
import { pluralize } from '@/utils.ts';

export type WorkLoadProps = {
	current: number;
	completed: number;
	funds: number;
	hours: number;
	className?: string;
};

export function WorkLoad({
	current,
	completed,
	funds,
	hours,
	className,
}: WorkLoadProps) {
	return (
		<div className={clsx(styles.cardRow, styles.work, className)}>
			<Text className={styles.workTasks} variant={TextVariants.caption}>
				Задачи
			</Text>
			<div className={clsx(styles.workCurrent)}>
				<span className={styles.primary}>{current}</span>
				<Text variant={TextVariants.title}>в работе</Text>
			</div>
			<div className={clsx(styles.workCompleted)}>
				<span className={styles.primary}>{completed}</span>
				<Text variant={TextVariants.title}>
					{pluralize(completed, ['выполнена', 'выполнены', 'выполнено'])}
				</Text>
			</div>
			<Text className={styles.workHelps} variant={TextVariants.caption}>
				Помог
			</Text>
			<div className={clsx(styles.workFunds)}>
				<span className={styles.secondary}>{funds}</span>
				<Text variant={TextVariants.title}>НКО</Text>
			</div>
			<Text className={styles.workWorks} variant={TextVariants.caption}>
				Затрачено
			</Text>
			<div className={clsx(styles.workHours)}>
				<span className={styles.secondary}>{hours}</span>
				<Text variant={TextVariants.title}>
					{pluralize(hours, ['час', 'часа', 'часов'])}
				</Text>
			</div>
		</div>
	);
}

export type StateProps = {
	registered: string;
	moderated: string;
	className?: string;
};

export function State({ registered, moderated, className }: StateProps) {
	return (
		<div
			className={clsx(
				styles.cardRow,
				styles.borderTop,
				styles.borderBottom,
				styles.state,
				className
			)}
		>
			<div className={styles.column}>
				<Text variant={TextVariants.caption}>Регистрация</Text>
				<Text variant={TextVariants.title}>{registered}</Text>
			</div>
			<div className={styles.column}>
				<Text variant={TextVariants.caption}>Модерация</Text>
				<Text variant={TextVariants.title}>{moderated}</Text>
			</div>
		</div>
	);
}

export type CardRowProps = {
	children: ReactNode;
	className?: string;
	border?: [boolean, boolean];
};

export function CardRow({ children, className, border }: CardRowProps) {
	const [hasTopBorder, hasBottomBorder] = border ?? [false, false];
	return (
		<div
			className={clsx(styles.cardRow, className, {
				[styles.borderTop]: hasTopBorder,
				[styles.borderBottom]: hasBottomBorder,
			})}
		>
			{children}
		</div>
	);
}

export type ActionsProps = {
	children: ReactNode;
	className?: string;
};

function Actions({ children, className }: ActionsProps) {
	return (
		<div className={clsx(styles.actions, className, styles.cardRow)}>
			{children}
		</div>
	);
}

export type TotalsProps = {
	items: Record<string, string | number | [string | number, string]>;
};

function Totals({ items }: TotalsProps) {
	return (
		<div className={clsx(styles.totals)}>
			{Object.entries(items).map(([key, value]) => {
				const [amount, color] = Array.isArray(value)
					? value
					: [value, 'primary'];
				return (
					<div key={key} className={styles.totalsRow}>
						<p className={styles.totalsKey}>{key}</p>
						<p className={clsx(styles.totalsValue, styles[color])}>{amount}</p>
					</div>
				);
			})}
		</div>
	);
}

export type ActivityProps = {
	items: Record<string, string>;
};

function Activity({ items }: ActivityProps) {
	return (
		<div className={clsx(styles.activity, styles.cardRow)}>
			{Object.entries(items).map(([key, value]) => (
				<div key={key} className={styles.activityRow}>
					<p className={styles.activityKey}>{key}</p>
					<p className={styles.activityValue}>{value}</p>
				</div>
			))}
		</div>
	);
}

export type CardProps = {
	className?: string;
	isFeatured?: boolean;
	children: ReactNode;
};

export interface CardSubComponents {
	Activity: typeof Activity;
	Totals: typeof Totals;
	Actions: typeof Actions;
	Row: typeof CardRow;
	State: typeof State;
	Work: typeof WorkLoad;
}

export const Card: FunctionComponent<CardProps> & CardSubComponents = ({
	className,
	isFeatured,
	children,
}: CardProps) => {
	return (
		<div
			className={clsx(styles.container, className, {
				[styles.featured]: isFeatured,
			})}
			data-testid="Card"
		>
			{children}
		</div>
	);
};

Card.Activity = Activity;
Card.Totals = Totals;
Card.Actions = Actions;
Card.Row = CardRow;
Card.State = State;
Card.Work = WorkLoad;
