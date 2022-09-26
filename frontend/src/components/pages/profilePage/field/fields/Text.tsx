import _ from 'lodash';

type ProfileTextFieldProps = {
    value: string;
    setValue: (value: string) => void;
    isEditMode: boolean;
};

export function ProfileTextField({
    value,
    setValue,
    isEditMode,
}: ProfileTextFieldProps) {
    return isEditMode ? (
        <input
            type='text'
            value={value}
            onInput={(event) => setValue(event.currentTarget.value)}
        />
    ) : (
        <div className='profile-field-value'>{value}</div>
    );
}
