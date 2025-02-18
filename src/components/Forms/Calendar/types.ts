import { Dayjs } from 'dayjs';

export enum ViewTypes {
	Days = 'days',
	Months = 'months',
	Years = 'years',
}

export type TCalendarContext = {
	min: Dayjs;
	max: Dayjs;
	currentDate: Dayjs;
	openedPeriod: Dayjs;
};

export interface ICalendarProps {
	currentDate?: string | Date;
	max?: string | Date;
	min?: string | Date;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ICalendarViewProps {
	onClick: (e: React.SyntheticEvent) => void;
}

export interface ICellProps {
	children: React.ReactNode;
	disabled?: boolean;
	selected?: boolean;
	ariaLabel?: string;
	tabindex?: number;
}
