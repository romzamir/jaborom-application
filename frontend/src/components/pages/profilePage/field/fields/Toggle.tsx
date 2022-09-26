type ProfileToggleFieldProps = {
    value: string;
    setValue: (value: string) => void;
    isEditMode: boolean;
};

export function ProfileToggleField({value}: ProfileToggleFieldProps) {
    return <div className='profile-field-value'>{value}</div>;
}
