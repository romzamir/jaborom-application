import {ProfileFieldContainer} from '../field';

export type ProfileLongTextFieldProps = {
    title: string;
    value: string | undefined;
    setValue: (value: string) => void;
    isEditMode: boolean;
};

export function ProfileLongTextField({
    title,
    value = '',
}: ProfileLongTextFieldProps) {
    return <ProfileFieldContainer title={title}>{value}</ProfileFieldContainer>;
}
