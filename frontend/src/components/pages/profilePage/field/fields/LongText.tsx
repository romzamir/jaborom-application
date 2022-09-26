type ProfileTextFieldProps = {
    title: string;
    value: string;
};

export function ProfileLongTextField({title, value}: ProfileTextFieldProps) {
    return (
        <div className='profile-field profile-text-field'>
            <div className='profile-field-title'>{title}</div>
            <div className='profile-field-value'>{value}</div>
        </div>
    );
}
