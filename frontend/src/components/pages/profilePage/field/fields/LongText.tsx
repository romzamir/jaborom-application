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
    setValue,
    isEditMode,
}: ProfileLongTextFieldProps) {
    return (
        <ProfileFieldContainer
            title={title}
            className='profile-long-text-field'
        >
            {isEditMode ? (
                <textarea
                    value={value}
                    onInput={(event) => setValue(event.currentTarget.value)}
                />
            ) : (
                value
            )}
        </ProfileFieldContainer>
    );
}
