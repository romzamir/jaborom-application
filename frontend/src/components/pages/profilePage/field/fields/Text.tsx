type ProfileTextFieldProps = {
    value: string;
    setValue: (value: string) => void;
    isEditMode: boolean;
};

export function ProfileTextField({value}: ProfileTextFieldProps) {
    return <div className='profile-field-value'>{value}</div>;
}
