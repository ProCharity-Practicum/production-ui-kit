import { createContext } from 'react';
import { TCalendarContext } from './types';

export const CalendarContext = createContext<TCalendarContext>(
	{} as TCalendarContext
);

CalendarContext.displayName = 'CalendarContext';
