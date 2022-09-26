import {useCallback} from 'react';
import {useParams} from 'react-router-dom';

import {ProfilePageHeader} from './header';
import {ProfilePageBody} from './body';
import {useFetch} from '../../../hooks';

import {profilesProvider} from '../../../api/providers/profiles.provider';

import './profilePage.css';

export function ProfilePage() {
    const {id} = useParams<ProfileParams>();
    const fetchProfile = useCallback(
        () => profilesProvider.getProfile(id || ''),
        [id],
    );

    const [isLoading, profileResult] = useFetch(fetchProfile);
    const profile = profileResult?.data;

    return (
        <>
            {isLoading ? (
                'בטעינה...'
            ) : !profile ? (
                'הפרופיל לא נמצא'
            ) : (
                <div className='profile-page'>
                    <ProfilePageHeader profile={profile} />
                    <ProfilePageBody profile={profile} />
                </div>
            )}
        </>
    );
}

type ProfileParams = {
    id: string;
};
