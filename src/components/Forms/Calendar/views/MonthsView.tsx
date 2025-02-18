import { chunk } from '@/utils';
import clsx from 'clsx';
import dayjs from 'dayjs';
import React, { useContext, useMemo } from 'react';
import styles from '../Calendar.module.scss';
import { CalendarContext } from '../CalendarContext';
import { Cell, Row, RowGroup } from '../components';

export const MonthsView: React.FC<{
	onClick: (e: React.SyntheticEvent) => void;
}> = ({ onClick }) => {
	const { min, max, currentDate, openedPeriod } = useContext(CalendarContext);
	const openedPeriodYear = openedPeriod.year();

	const monthsRows = useMemo(() => {
		const dates: dayjs.Dayjs[] = [];
		for (let i = 1; i <= 12; i++) {
			dates.push(dayjs(`${openedPeriodYear}-${i}-01`));
		}
		return chunk(dates, 4);
	}, [openedPeriodYear]);

	return (
		<RowGroup>
			{monthsRows.map((months, rowIndex) => (
				<Row key={`month-row-${rowIndex}`}>
					{months.map((month, monthIndex) => {
						let monthLabel = month.format('MMM');
						if (monthLabel.length !== 3) {
							monthLabel = month.format('MMM').slice(0, -1);
						}
						const isSelectedMonth = month.isSame(currentDate, 'month');
						const isDisabled =
							month.isBefore(min, 'month') || month.isAfter(max, 'month');

						return (
							<Cell
								key={`month-${monthIndex}`}
								ariaLabel={month.locale('en').format('MMM YYYY')}
								selected={isSelectedMonth}
							>
								<div
									className={clsx(
										styles['cell-content'],
										styles['cell-content_wide']
									)}
								>
									<button
										className={clsx(
											styles['button'],
											isSelectedMonth && styles['button_selected']
										)}
										onMouseUp={onClick}
										disabled={isDisabled}
										data-month={month.format('YYYY-MM')}
										data-testid={`button-month-${month.format('YYYY-MM')}`}
										type="button"
									>
										{monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1)}
									</button>
								</div>
							</Cell>
						);
					})}
				</Row>
			))}
		</RowGroup>
	);
};
