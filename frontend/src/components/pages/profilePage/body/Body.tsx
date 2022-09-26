import {Profile} from '../../../../core/models/profile';
import {ProfileField} from '../field';

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
            <ProfileField title='כתובת' type='Text' value={profile.address} />
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
