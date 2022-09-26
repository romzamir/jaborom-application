export function differenceObjects<T extends {}>(
    original: T,
    changed: T,
): Partial<T> {
    const difference: Partial<T> = {};
    const originalKeys = Object.keys(original) as (keyof T)[];
    for (const key of originalKeys) {
        if (!(key in original)) continue;
        if (!(key in changed)) continue;

        const originalValue = original[key];
        const newValue = changed[key];

        if (originalValue !== newValue) {
            difference[key] = newValue;
        }
    }

    return difference;
}
