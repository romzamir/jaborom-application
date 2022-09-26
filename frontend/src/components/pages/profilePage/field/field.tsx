import {fieldsComponentsByNames, FieldType} from './fields';

import './field.css';

export function ProfileField<T>({title, type, value}: ProfileFieldProps<T>) {
    return fieldsComponentsByNames[type](title, value);
}

type ProfileFieldProps<T> = {
    title: string;
    type: FieldType;
    value: T;
};
