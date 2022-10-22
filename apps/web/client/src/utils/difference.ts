export function differenceObjects<T extends {}>(
    original: T,
    changed: T,
    options: Partial<DifferenceObjectsOptions> = {},
): Partial<T> {
    options = {...DEFAULT_DIFFERENCE_OBJECTS_OPTIONS, ...options};
    const difference: Partial<T> = {};
    const originalKeys = Object.keys(original) as (keyof T)[];
    for (const key of originalKeys) {
        if (!(key in original)) continue;
        if (!(key in changed)) continue;

        const originalValue = original[key];
        const newValue = changed[key];

        const parsedOriginalValue =
            typeof originalValue === 'string' && options.trimStrings
                ? originalValue.trim()
                : originalValue;
        const parsedNewValue =
            typeof newValue === 'string' && options.trimStrings
                ? newValue.trim()
                : newValue;

        if (parsedOriginalValue !== parsedNewValue) {
            difference[key] = parsedNewValue as T[keyof T];
        }
    }

    return difference;
}

type DifferenceObjectsOptions = {
    trimStrings: boolean;
};

const DEFAULT_DIFFERENCE_OBJECTS_OPTIONS: DifferenceObjectsOptions = {
    trimStrings: false,
};
