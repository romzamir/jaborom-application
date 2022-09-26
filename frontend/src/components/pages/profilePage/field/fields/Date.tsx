import {dateToLongDateString} from '../../../../../utils/date';
import {ProfileFieldContainer} from '../field';

export type ProfileDateFieldProps = {
    title: string;
    value: Date;
    setValue: (value: Date) => void;
    isEditMode: boolean;
};

export function ProfileDateField({title, value}: ProfileDateFieldProps) {
    return (
        <ProfileFieldContainer title={title}>
            {dateToLongDateString(value)}
        </ProfileFieldContainer>
    );
}
