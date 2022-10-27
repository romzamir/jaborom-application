import {
    Profile,
    profileSexToString,
    sexStringToProfileSex,
} from '@jaborom/core';
import {
    ProfileDateField,
    ProfileLongTextField,
    ProfileTextField,
    ProfileToggleField,
} from '../field';
import {SEX_OPTIONS} from '../../../../constants/profile';

import './body.css';

type ProfilePageBodyProps = {
    profile: Profile;
    setField: <T extends keyof Profile>(key: T, value: Profile[T]) => void;
    isEditMode: boolean;
};

export function ProfilePageBody({
    profile,
    setField,
    isEditMode,
}: ProfilePageBodyProps) {
    return (
        <div className='profile-page-body'>
            <ProfileDateField
                title='תאריך לידה'
                value={profile.dateOfBirth ?? new Date()}
                setValue={(value) => setField('dateOfBirth', value)}
                isEditMode={isEditMode}
            />
            <ProfileToggleField
                title='מין'
                value={profileSexToString(profile.sex)}
                setValue={(value) =>
                    setField('sex', sexStringToProfileSex(value))
                }
                options={SEX_OPTIONS}
                isEditMode={isEditMode}
            />
            <ProfileTextField
                title='כתובת'
                value={profile.address}
                setValue={(value) => setField('address', value)}
                isEditMode={isEditMode}
            />
            <ProfileLongTextField
                title='תחביבים'
                value={profile.hobbies}
                setValue={(value) => setField('hobbies', value)}
                isEditMode={isEditMode}
            />
            <ProfileLongTextField
                title='אלרגיות'
                value={profile.allergies}
                setValue={(value) => setField('allergies', value)}
                isEditMode={isEditMode}
            />
            <ProfileLongTextField
                title='הערות'
                value={profile.notes}
                setValue={(value) => setField('notes', value)}
                isEditMode={isEditMode}
            />
        </div>
    );
}
