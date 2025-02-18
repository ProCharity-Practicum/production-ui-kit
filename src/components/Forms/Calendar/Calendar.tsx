import { capitalizeString } from '@/utils';
import clsx from 'clsx';
import dayjs, { Dayjs, UnitTypeLong } from 'dayjs';
import React, {
	SyntheticEvent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import styles from './Calendar.module.scss';
import { CalendarContext } from './CalendarContext';
import { Row } from './components';
import { DATE_FORMATS } from './helpers/dateUtils';
import { ICalendarProps, ViewTypes } from './types';
import { DaysView, MonthsView, YearsView } from './views';

export const Calendar = ({
	currentDate,
	max,
	min,
	onChange,
}: ICalendarProps) => {
	const [view, setView] = useState<ViewTypes>(ViewTypes.Days);

	const initCurrentDate = useCallback(() => {
		const date = dayjs(currentDate, DATE_FORMATS);
		if (!date.isValid()) {
			return dayjs();
		} else {
			return dayjs(currentDate, DATE_FORMATS);
		}
	}, [currentDate]);

	const initMinDate = useCallback(() => {
		const date = dayjs(min, DATE_FORMATS);
		if (!date.isValid()) {
			const MIN_DATE = new Date(-8640000000000000);
			return dayjs(MIN_DATE);
		} else {
			return dayjs(min, DATE_FORMATS);
		}
	}, [min]);

	const initMaxDate = useCallback(() => {
		const date = dayjs(max, DATE_FORMATS);
		if (!date.isValid()) {
			const MAX_DATE = new Date(8640000000000000);
			return dayjs(MAX_DATE);
		} else {
			return dayjs(max, DATE_FORMATS);
		}
	}, [max]);

	const [openedPeriod, setPeriod] = useState<Dayjs>(initCurrentDate);

	const [currentDateObj, setCurrentDateObj] = useState(
		dayjs(currentDate, DATE_FORMATS)
	);
	const [minDateObj, setMinDateObj] = useState(initMinDate);
	const [maxDateObj, setMaxDateObj] = useState(initMaxDate);

	useEffect(() => {
		setCurrentDateObj(initCurrentDate);
	}, [currentDate, initCurrentDate]);

	useEffect(() => {
		setMinDateObj(initMinDate);
	}, [min, initMinDate]);

	useEffect(() => {
		setMaxDateObj(initMaxDate);
	}, [max, initMaxDate]);

	const changeView = () => {
		switch (view) {
			case ViewTypes.Days:
				setView(ViewTypes.Months);
				break;
			case ViewTypes.Months:
				setView(ViewTypes.Years);
				break;
			case ViewTypes.Years:
				setView(ViewTypes.Days);
				break;
		}
	};

	const periods: Record<
		ViewTypes,
		[number, Extract<UnitTypeLong, 'month' | 'year'>]
	> = {
		[ViewTypes.Days]: [1, 'month'],
		[ViewTypes.Months]: [1, 'year'],
		[ViewTypes.Years]: [10, 'year'],
	};

	const handlePrevPeriod = () => {
		setPeriod(openedPeriod.subtract(...periods[view]));
	};

	const handleNextPeriod = () => {
		setPeriod(openedPeriod.add(...periods[view]));
	};

	const openedPeriodYear = openedPeriod.year();
	const openedPeriodMonthYear = openedPeriod.format('MMMM YYYY');

	const label = useMemo(() => {
		switch (view) {
			case ViewTypes.Days:
				return capitalizeString(openedPeriodMonthYear);
			case ViewTypes.Months:
				return openedPeriodYear;
			case ViewTypes.Years:
				return `${openedPeriodYear - 9}-${openedPeriodYear}`;
		}
	}, [openedPeriodMonthYear, openedPeriodYear, view]);

	const handleDayClick = (e: SyntheticEvent) => {
		const { date } = (e.target as HTMLElement).dataset;
		onChange?.({
			target: {
				value: date,
			},
		} as React.ChangeEvent<HTMLInputElement>);
	};

	const handleMonthClick = (e: SyntheticEvent) => {
		const { month } = (e.target as HTMLElement).dataset;
		setPeriod(dayjs(month));
		setView(ViewTypes.Days);
	};

	const handleYearClick = (e: SyntheticEvent) => {
		const { year } = (e.target as HTMLElement).dataset;
		setPeriod(dayjs(year));
		setView(ViewTypes.Months);
	};

	return (
		<div className={styles['calendar']} role="grid" tabIndex={0}>
			<Row>
				<div className={styles['slider']}>
					<button
						onMouseUp={handlePrevPeriod}
						data-testid={`prev-period-button`}
						className={clsx(
							styles['slider__control'],
							styles['slider__control_left']
						)}
						type="button"
					/>
					<button
						className={styles['slider__button']}
						onMouseUp={changeView}
						data-testid={`center-period-button`}
						disabled={view === ViewTypes.Years}
						type="button"
					>
						{label}
					</button>
					<button
						onMouseUp={handleNextPeriod}
						data-testid={`next-period-button`}
						className={clsx(
							styles['slider__control'],
							styles['slider__control_right']
						)}
						type="button"
					/>
				</div>
			</Row>
			<CalendarContext.Provider
				value={{
					min: minDateObj,
					max: maxDateObj,
					currentDate: currentDateObj,
					openedPeriod,
				}}
			>
				{view === ViewTypes.Days && <DaysView onClick={handleDayClick} />}
				{view === ViewTypes.Months && <MonthsView onClick={handleMonthClick} />}
				{view === ViewTypes.Years && <YearsView onClick={handleYearClick} />}
			</CalendarContext.Provider>
		</div>
	);
};
