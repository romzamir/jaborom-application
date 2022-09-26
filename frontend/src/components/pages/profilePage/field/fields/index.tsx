import {ProfileLongTextField} from './LongText';
import {ProfileTextField} from './Text';

export type FieldType = 'Text' | 'Long Text';

export const fieldsComponentsByNames: Record<
    FieldType,
    (value: any) => JSX.Element
> = {
    Text: (value: string) => <ProfileTextField value={value} />,
    'Long Text': (value: string) => <ProfileLongTextField value={value} />,
};
