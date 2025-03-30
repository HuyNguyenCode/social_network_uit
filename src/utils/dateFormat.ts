import { formatDistanceToNow } from 'date-fns';

export const getTimeAgo = (date: string | Date) => {
    try {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return formatDistanceToNow(dateObj, { 
            addSuffix: true // This adds "ago" at the end
        });
    } catch (error) {
        console.error('Invalid date:', error);
        return 'some time ago';
    }
}; 