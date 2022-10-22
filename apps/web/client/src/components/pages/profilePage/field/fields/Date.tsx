import DatePicker, {registerLocale} from 'react-datepicker';
import heLocale from 'date-fns/locale/he';

import {dateToLongDateString} from '@jaborom/core';
import {ProfileFieldContainer} from '../field';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('he', heLocale);

export type ProfileDateFieldProps = {
    title: string;
    value: Date;
    setValue: (value: Date) => void;
    isEditMode: boolean;
};

export function ProfileDateField({
    title,
    value,
    setValue,
    isEditMode,
}: ProfileDateFieldProps) {
    return (
        <ProfileFieldContainer title={title}>
            {isEditMode ? (
                <DatePicker
                    wrapperClassName='profile-date-field'
                    className='profile-date-field-input'
                    locale='he'
                    selected={value}
                    onChange={setValue}
                    dateFormat='dd/MM/yyyy'
                />
            ) : (
                dateToLongDateString(value)
            )}
        </ProfileFieldContainer>
    );
}
