import DatePicker from 'react-datepicker';

import {dateToLongDateString} from '../../../../../utils/date';
import {ProfileFieldContainer} from '../field';

import 'react-datepicker/dist/react-datepicker.css';

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
