import React from 'react';

import './field.css';

export const ProfileField = React.memo(function ProfileField<T>({
    type,
}: ProfileFieldProps<T>) {
    return <></>;
});

type ProfileFieldProps<T> = {
    type: string;
    value: T;
    setValue: (newValue: T) => void;
};
