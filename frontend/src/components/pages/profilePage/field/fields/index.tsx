import {ProfileDateField} from './Date';
import {ProfileLongTextField} from './LongText';
import {ProfileTextField} from './Text';

export type FieldType = 'Date' | 'Text' | 'Long Text' | 'Toggle';

export const fieldsComponentsByNames: Record<
    FieldType,
    (
        value: any,
        setValue: (value: any) => void,
        isEditMode: boolean,
    ) => JSX.Element
> = {
    Date: (
        value: Date,
        setValue: (value: any) => void,
        isEditMode: boolean,
    ) => (
        <ProfileDateField
            value={value}
            setValue={setValue}
            isEditMode={isEditMode}
        />
    ),
    Text: (
        value: string,
        setValue: (value: any) => void,
        isEditMode: boolean,
    ) => (
        <ProfileTextField
            value={value}
            setValue={setValue}
            isEditMode={isEditMode}
        />
    ),
    'Long Text': (
        value: string,
        setValue: (value: any) => void,
        isEditMode: boolean,
    ) => (
        <ProfileLongTextField
            value={value}
            setValue={setValue}
            isEditMode={isEditMode}
        />
    ),
    Toggle: (
        value: string,
        setValue: (value: any) => void,
        isEditMode: boolean,
    ) => (
        <ProfileTextField
            value={value}
            setValue={setValue}
            isEditMode={isEditMode}
        />
    ),
};
