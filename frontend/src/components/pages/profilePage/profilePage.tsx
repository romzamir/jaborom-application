import {useCallback} from 'react';
import {useParams} from 'react-router-dom';

import {profilesProvider} from '../../../api/providers/profiles.provider';

import './profilePage.css';
import {useFetch} from '../../../hooks';

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
                    <div className='profile-page-header'>
                        <span className='profile-name'>
                            {profile.firstName} {profile.lastName}
                        </span>
                        <span className='profile-person-id'>
                            {profile.personId}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}

type ProfileParams = {
    id: string;
};
