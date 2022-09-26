type ProfileTextFieldProps = {
    value: string;
    setValue: (value: string) => void;
    isEditMode: boolean;
};

export function ProfileLongTextField({value}: ProfileTextFieldProps) {
    return <div className='profile-field-value'>{value}</div>;
}
