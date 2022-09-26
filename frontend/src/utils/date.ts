export function dateToLongDateString(date: Date): string {
    return longDateFormat.format(date);
}

const longDateFormat = new Intl.DateTimeFormat('he', {
    month: 'long',
    day: '2-digit',
    weekday: 'long',
    year: 'numeric',
});
