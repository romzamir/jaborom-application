import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {AxiosResponse} from 'axios';

import {Profile} from '../../../core/types/profile.type';
import {profilesProvider} from '../../../api/providers/profiles.provider';

import './profilePage.css';

export function ProfilePage() {
    const {id} = useParams<ProfileParams>();
    const [profile, setProfile] = useState<Profile | null>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const promise = profilesProvider.getProfile(id || '');
        promise.then(profileReceived);
        return promise.cancel;
    }, [id]);

    const profileReceived = (response: AxiosResponse<Profile>) => {
        setIsLoading(false);
        setProfile(response.data ?? null);
    };

    return (
        <div className='profile-page'>
            <div className='profile-header'>
                <div className='profile-image'></div>
            </div>
        </div>
    );
}

type ProfileParams = {
    id: string;
};
