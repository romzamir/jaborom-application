import {Profile} from '../../../../core/models/profile';
import {ProfileField} from '../field';

import {profileSexToString, sexStringToProfileSex} from '../../../../utils/sex';

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
            <ProfileField
                title='תאריך לידה'
                type='Date'
                value={profile.dateOfBirth}
                setValue={(value) => setField('dateOfBirth', value)}
                isEditMode={isEditMode}
            />
            <ProfileField
                title='מין'
                type='Toggle'
                value={profileSexToString(profile.sex)}
                setValue={(value) =>
                    setField('sex', sexStringToProfileSex(value))
                }
                isEditMode={isEditMode}
            />
            <ProfileField
                title='כתובת'
                type='Text'
                value={profile.address}
                setValue={(value) => setField('address', value)}
                isEditMode={isEditMode}
            />
            <ProfileField
                title='תחביבים'
                type='Long Text'
                value={profile.hobbies}
                setValue={(value) => setField('hobbies', value)}
                isEditMode={isEditMode}
            />
            <ProfileField
                title='אלרגיות'
                type='Long Text'
                value={profile.allergies}
                setValue={(value) => setField('allergies', value)}
                isEditMode={isEditMode}
            />
            <ProfileField
                title='הערות'
                type='Long Text'
                value={profile.notes}
                setValue={(value) => setField('notes', value)}
                isEditMode={isEditMode}
            />
        </div>
    );
}
