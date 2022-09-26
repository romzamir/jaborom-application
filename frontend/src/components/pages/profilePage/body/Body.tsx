import {Profile} from '../../../../core/models/profile';
import {ProfileField} from '../field';

import {sexToString} from '../../../../utils/sex';

import './body.css';

type ProfilePageBodyProps = {
    profile: Profile;
};

export function ProfilePageBody({profile}: ProfilePageBodyProps) {
    return (
        <div className='profile-page-body'>
            <ProfileField
                title='תאריך לידה'
                type='Date'
                value={profile.dateOfBirth}
            />
            <ProfileField
                title='מין'
                type='Toggle'
                value={sexToString(profile.sex)}
            />
            <ProfileField title='כתובת' type='Text' value={profile.address} />
            <ProfileField
                title='תחביבים'
                type='Long Text'
                value={profile.hobbies}
            />
            <ProfileField
                title='אלרגיות'
                type='Long Text'
                value={profile.allergies}
            />
            <ProfileField
                title='הערות'
                type='Long Text'
                value={profile.notes}
            />
        </div>
    );
}
