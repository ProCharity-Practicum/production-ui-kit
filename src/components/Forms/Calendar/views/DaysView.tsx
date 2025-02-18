import clsx from 'clsx';
import { useContext } from 'react';
import { CalendarContext } from '../CalendarContext';

import styles from '../Calendar.module.scss';
import { Cell, Row, RowGroup } from '../components';
import { generateWeeksOfTheMonth } from '../helpers/dateUtils';
import { ICalendarViewProps } from '../types';

export const DaysView = ({
	onClick,
}: {
	onClick: ICalendarViewProps['onClick'];
}) => {
	const { min, max, currentDate, openedPeriod } = useContext(CalendarContext);
	const weeksOfTheMonth = generateWeeksOfTheMonth(openedPeriod);

	return (
		<div className={styles.view}>
			<RowGroup>
				<Row>
					{weeksOfTheMonth[0]?.map((day, dayIndex) => (
						<div key={dayIndex} className={styles['week-day__label']}>
							{day.format('dd').toUpperCase()}
						</div>
					))}
				</Row>
			</RowGroup>

			<RowGroup>
				{weeksOfTheMonth.map((week, weekIndex) => (
					<Row key={weekIndex}>
						{week.map((day, dayIndex) => {
							const isSelectedDay = currentDate.isSame(day, 'day');
							const isDisabled =
								day.isBefore(min, 'day') || day.isAfter(max, 'day');

							return (
								<Cell
									key={dayIndex}
									ariaLabel={day.toDate().toDateString()}
									selected={isSelectedDay}
									disabled={isDisabled}
								>
									<div className={styles['cell-content']}>
										{openedPeriod.isSame(day, 'month') && (
											<button
												className={clsx(
													styles.button,
													isSelectedDay && styles.button_selected
												)}
												onMouseUp={onClick}
												disabled={isDisabled}
												data-date={day.format('YYYY-MM-DD')}
											>
												{day.date()}
											</button>
										)}
									</div>
								</Cell>
							);
						})}
					</Row>
				))}
			</RowGroup>
		</div>
	);
};
