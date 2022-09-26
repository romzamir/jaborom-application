import {useEffect, useState} from 'react';
import {Profile} from '../../../../core/types/profile.type';
import {ProfileField} from '../field';

type ProfilePageBodyProps = {
    profile: Profile;
};

export function ProfilePageBody({profile}: ProfilePageBodyProps) {
    return (
        <div className='profile-page-body'>
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
