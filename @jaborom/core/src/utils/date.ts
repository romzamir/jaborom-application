export function dateToLongDateString(date: Date): string {
    return longDateFormat.format(date);
}

export const intoDate = (maybeDate: Date | string | null): Date | null => {
    if (!maybeDate) return null;
    return new Date(maybeDate);
};

const longDateFormat = new Intl.DateTimeFormat('he', {
    month: 'long',
    day: '2-digit',
    weekday: 'long',
    year: 'numeric',
});
