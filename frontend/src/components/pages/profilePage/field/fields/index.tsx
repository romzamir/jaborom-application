import {ProfileLongTextField} from './LongText';
import {ProfileTextField} from './Text';

export type FieldType = 'Text' | 'Long Text';

export const fieldsComponentsByNames: Record<
    FieldType,
    (title: string, value: any) => JSX.Element
> = {
    Text: (title: string, value: string) => (
        <ProfileTextField title={title} value={value} />
    ),
    'Long Text': (title: string, value: string) => (
        <ProfileLongTextField title={title} value={value} />
    ),
};
