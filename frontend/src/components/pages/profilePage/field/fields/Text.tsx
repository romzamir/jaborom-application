type ProfileTextFieldProps = {
    value: string;
};

export function ProfileTextField({value}: ProfileTextFieldProps) {
    return <div className='profile-field-value'>{value}</div>;
}
