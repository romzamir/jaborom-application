import _ from 'lodash';
import {ProfileFieldContainer} from '../field';

export type ProfileTextFieldProps = {
    title: string;
    value: string;
    setValue: (value: string) => void;
    isEditMode: boolean;
};

export function ProfileTextField({
    title,
    value,
    setValue,
    isEditMode,
}: ProfileTextFieldProps) {
    return (
        <ProfileFieldContainer title={title}>
            {isEditMode ? (
                <input
                    type='text'
                    value={value ?? ''}
                    onInput={(event) => setValue(event.currentTarget.value)}
                />
            ) : (
                value
            )}
        </ProfileFieldContainer>
    );
}
