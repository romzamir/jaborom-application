import {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {AxiosResponse} from 'axios';

import {Profile} from 'core/types/profile.type';
import {profilesProvider} from 'api/providers/profiles.provider';

import './profilePage.css';

export function ProfilePage() {
    const {id} = useParams<ProfileParams>();
    const [profile, setProfile] = useState<Profile | null>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const promise = profilesProvider.getProfile(id);
        promise.then(profileReceived);
        return promise.cancel;
    }, [id]);

    const profileReceived = (response: AxiosResponse<Profile>) => {
        setIsLoading(false);
        setProfile(response.data ?? null);
    };

    return isLoading ? <div>LOADING...</div> : <div className='profile-page'>{profile?.firstName}</div>;
}

type ProfileParams = {
    id: string;
};
