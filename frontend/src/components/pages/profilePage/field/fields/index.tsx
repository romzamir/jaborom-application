import {ProfileDateField} from './Date';
import {ProfileLongTextField} from './LongText';
import {ProfileTextField} from './Text';

export type FieldType = 'Date' | 'Text' | 'Long Text' | 'Toggle';

export const fieldsComponentsByNames: Record<
    FieldType,
    (value: any) => JSX.Element
> = {
    Date: (value: Date) => <ProfileDateField value={value} />,
    Text: (value: string) => <ProfileTextField value={value} />,
    'Long Text': (value: string) => <ProfileLongTextField value={value} />,
    Toggle: (value: string) => <ProfileTextField value={value} />,
};
