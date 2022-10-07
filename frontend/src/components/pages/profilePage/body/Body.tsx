import {Profile} from '../../../../core/models/profile';
import {
    ProfileDateField,
    ProfileLongTextField,
    ProfileTextField,
    ProfileToggleField,
} from '../field';

import {profileSexToString, sexStringToProfileSex} from '../../../../utils/sex';
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
            {isEditMode && (
                <>
                    <ProfileDateField
                        title='תאריך קליטה'
                        value={profile.dateOfSigning}
                        setValue={(value) => setField('dateOfSigning', value)}
                        isEditMode={isEditMode}
                    />
                    <ProfileTextField
                        title='שם פרטי'
                        value={profile.firstName}
                        setValue={(value) => setField('firstName', value)}
                        isEditMode={isEditMode}
                    />
                    <ProfileTextField
                        title='שם משפחה'
                        value={profile.lastName}
                        setValue={(value) => setField('lastName', value)}
                        isEditMode={isEditMode}
                    />
                    <ProfileTextField
                        title='תעודת זהות'
                        value={profile.personId}
                        setValue={(value) => setField('personId', value)}
                        isEditMode={isEditMode}
                    />
                </>
            )}
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
