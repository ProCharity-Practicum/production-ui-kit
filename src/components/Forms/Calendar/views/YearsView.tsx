import { chunk } from '@/utils';
import clsx from 'clsx';
import dayjs from 'dayjs';
import React, { useContext, useMemo } from 'react';
import styles from '../Calendar.module.scss';
import { CalendarContext } from '../CalendarContext';
import { Cell, Row, RowGroup } from '../components';

export const YearsView: React.FC<{
	onClick: (e: React.SyntheticEvent) => void;
}> = ({ onClick }) => {
	const { min, max, currentDate, openedPeriod } = useContext(CalendarContext);
	const openedPeriodYear = openedPeriod.year();

	const yearsRows = useMemo(() => {
		const YEARS_TO_SHOW = 10;
		const YEARS_IN_ROW = 5;
		const dates: dayjs.Dayjs[] = [];
		for (
			let i = openedPeriodYear - YEARS_TO_SHOW + 1;
			i <= openedPeriodYear;
			i++
		) {
			dates.push(dayjs().year(i));
		}
		return chunk(dates, YEARS_IN_ROW);
	}, [openedPeriodYear]);

	return (
		<RowGroup>
			{yearsRows.map((yearRow, yearRowIndex) => (
				<Row key={`year-${yearRowIndex}`}>
					{yearRow.map((year) => {
						const isSelectedYear = currentDate.isSame(year, 'year');
						const isDisabled =
							year.isBefore(min, 'year') || year.isAfter(max, 'year');

						return (
							<Cell
								key={`year-${year.year()}`}
								selected={isSelectedYear}
								disabled={isDisabled}
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
											isSelectedYear && styles['button_selected']
										)}
										onMouseUp={onClick}
										disabled={isDisabled}
										data-year={year.format('YYYY')}
										data-testid={`year-button-${year.format('YYYY')}`}
										type="button"
									>
										{year.year()}
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
