import { Dayjs } from 'dayjs';
import { ViewTypes } from '../types';

export function getHeaderLabel(view: ViewTypes, date: Dayjs): string {
	switch (view) {
		case ViewTypes.Days:
			return date.format('MMMM YYYY');
		case ViewTypes.Months:
			return date.format('YYYY');
		case ViewTypes.Years:
			return `${date.year() - 9} - ${date.year()}`;
		default:
			return date.format('LL');
	}
}
