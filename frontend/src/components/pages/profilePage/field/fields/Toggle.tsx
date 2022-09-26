type ProfileToggleFieldProps = {
    value: string;
};

export function ProfileToggleField({value}: ProfileToggleFieldProps) {
    return <div className='profile-field-value'>{value}</div>;
}
