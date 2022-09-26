import {dateToLongDateString} from '../../../../../utils/date';

type ProfileDateFieldProps = {
    value: Date;
    setValue: (value: Date) => void;
    isEditMode: boolean;
};

export function ProfileDateField({value}: ProfileDateFieldProps) {
    return (
        <div className='profile-field-value'>{dateToLongDateString(value)}</div>
    );
}
