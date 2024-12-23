import { format } from 'date-fns';

export function convertSpecificDateToDateWindow(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return format(date, 'MMMM-yyyy');
}
