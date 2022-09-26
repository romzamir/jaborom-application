import {dateToLongDateString} from '../../../../../utils/date';

type ProfileDateFieldProps = {
    value: Date;
};

export function ProfileDateField({value}: ProfileDateFieldProps) {
    return (
        <div className='profile-field-value'>{dateToLongDateString(value)}</div>
    );
}
