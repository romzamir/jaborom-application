import React from 'react';
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
                // Make '\n' characters actually break the lines
                value.split('\n').map((line, index) => {
                    if (index === 0) {
                        return (
                            <React.Fragment key={index}>{line}</React.Fragment>
                        );
                    }

                    return (
                        <React.Fragment key={index}>
                            <br /> {line}
                        </React.Fragment>
                    );
                })
            )}
        </ProfileFieldContainer>
    );
}
