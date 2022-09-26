import {fieldsComponentsByNames, FieldType} from './fields';

import './field.css';

export function ProfileField<T>({
    title,
    type,
    value,
    setValue,
    isEditMode,
}: ProfileFieldProps<T>) {
    return (
        <div className='profile-field-container'>
            <div className='profile-field-title'>{title}:</div>
            {fieldsComponentsByNames[type](value, setValue, isEditMode)}
        </div>
    );
}

type ProfileFieldProps<T> = {
    title: string;
    type: FieldType;
    value: T;
    setValue: (value: T) => void;
    isEditMode: boolean;
};
