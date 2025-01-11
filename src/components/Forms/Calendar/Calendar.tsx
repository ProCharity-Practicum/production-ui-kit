import clsx from 'clsx';
import styles from './Calendar.module.scss';

export type CalendarProps = {
	className?: string;
};

export function Calendar({ className }: CalendarProps) {
	return (
		<div className={clsx(styles.container, className)} data-testid="Calendar">
			Calendar
		</div>
	);
}
