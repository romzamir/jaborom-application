import {Profile} from '../../../../core/types/profile.type';

import './header.css';

type ProfilePageHeaderProps = {
    profile: Profile;
};

export function ProfilePageHeader({profile}: ProfilePageHeaderProps) {
    return (
        <div className='profile-page-header'>
            <span className='profile-name'>
                {profile.firstName} {profile.lastName}
            </span>
            <span className='profile-person-id'>{profile.personId}</span>
        </div>
    );
}
