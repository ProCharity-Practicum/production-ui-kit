import dayjs, { Dayjs } from 'dayjs';

export const DATE_FORMATS = ['DD.MM.YYYY', 'YYYY-MM-DD'];

export const generateWeeksOfTheMonth = (date: Dayjs): Dayjs[][] => {
	const firstDayOfTheMonth = date.clone().startOf('month');
	const firstDayOfFirstWeekOfMonth = dayjs(firstDayOfTheMonth).startOf('week');
	const lastDayOfTheMonth = date.clone().endOf('month');
	const lastDayOfLastWeekOfMonth = lastDayOfTheMonth.endOf('week');

	const weeks: Dayjs[][] = [];
	let currentDay = firstDayOfFirstWeekOfMonth;

	while (currentDay.isBefore(lastDayOfLastWeekOfMonth)) {
		const week: Dayjs[] = [];
		for (let i = 0; i < 7; i++) {
			week.push(currentDay);
			currentDay = currentDay.add(1, 'day');
		}
		weeks.push(week);
	}

	return weeks;
};
