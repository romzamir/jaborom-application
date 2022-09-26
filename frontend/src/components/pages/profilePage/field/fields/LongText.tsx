type ProfileTextFieldProps = {
    value: string;
};

export function ProfileLongTextField({value}: ProfileTextFieldProps) {
    return <div className='profile-field-value'>{value}</div>;
}
