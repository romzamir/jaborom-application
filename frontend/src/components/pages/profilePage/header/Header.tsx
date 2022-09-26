import {Profile} from '../../../../core/models/profile';

import {dateToLongDateString} from '../../../../utils/date';

import './header.css';

type ProfilePageHeaderProps = {
    profile: Profile;
};

export function ProfilePageHeader({profile}: ProfilePageHeaderProps) {
    return (
        <div className='profile-page-header'>
            <div className='profile-page-header-main'>
                <span className='profile-name'>
                    {profile.firstName} {profile.lastName}
                </span>
                <span className='profile-person-id'>{profile.personId}</span>
            </div>
            <div className='profile-page-header-extras'>
                <span className='profile-sign-date'>
                    הפרופיל נוצר ב{dateToLongDateString(profile.dateOfSigning)}
                </span>
            </div>
        </div>
    );
}
