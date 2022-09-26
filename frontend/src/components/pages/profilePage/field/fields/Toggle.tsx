import {ProfileFieldContainer} from '../field';

export type ProfileToggleFieldProps = {
    title: string;
    value: string;
    setValue: (value: string) => void;
    isEditMode: boolean;
};

export function ProfileToggleField({
    title,
    value,
    setValue,
    isEditMode,
}: ProfileToggleFieldProps) {
    return <ProfileFieldContainer title={title}>{value}</ProfileFieldContainer>;
}
