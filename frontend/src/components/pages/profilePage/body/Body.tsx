import {Profile} from '../../../../core/models/profile';
import {ProfileField} from '../field';

import {profileSexToString} from '../../../../utils/sex';

import './body.css';

type ProfilePageBodyProps = {
    profile: Profile;
    isEditMode: boolean;
};

export function ProfilePageBody({profile, isEditMode}: ProfilePageBodyProps) {
    return (
        <div className='profile-page-body'>
            <ProfileField
                title='תאריך לידה'
                type='Date'
                value={profile.dateOfBirth}
                isEditMode={isEditMode}
            />
            <ProfileField
                title='מין'
                type='Toggle'
                value={profileSexToString(profile.sex)}
                isEditMode={isEditMode}
            />
            <ProfileField
                title='כתובת'
                type='Text'
                value={profile.address}
                isEditMode={isEditMode}
            />
            <ProfileField
                title='תחביבים'
                type='Long Text'
                value={profile.hobbies}
                isEditMode={isEditMode}
            />
            <ProfileField
                title='אלרגיות'
                type='Long Text'
                value={profile.allergies}
                isEditMode={isEditMode}
            />
            <ProfileField
                title='הערות'
                type='Long Text'
                value={profile.notes}
                isEditMode={isEditMode}
            />
        </div>
    );
}
