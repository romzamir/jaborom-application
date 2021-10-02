import _ from 'lodash';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {ProfilesPageItem} from './profilesPageItem';
import {ProfilesPageSearchBar} from './profilesPageSearchBar';

import {Profile} from 'core/types/profile.type';

import {profilesProvider} from 'api/providers/profiles.provider';

import './profilesPage.css';
import {AxiosResponse} from 'axios';

export function ProfilesPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const location = useLocation();

    useEffect(() => {
        const searchText = getSearchText();
        const searchPromise = performSearch(searchText);
        searchPromise.then(onSearchResponse);
        return searchPromise.cancel;
    }, [location]);

    const getSearchText = () => {
        return new URLSearchParams(location.search).get('search') || '';
    };

    const performSearch = (searchText: string) => {
        if (_.isEmpty(searchText)) {
            return profilesProvider.getAllProfiles();
        }

        return profilesProvider.searchProfiles(searchText);
    };

    const onSearchResponse = (response: AxiosResponse<Profile[]>) => {
        if (response.status === 200) {
            setProfiles(response.data);
            setIsLoading(false);
        }

        console.log('Response', response);
    };

    return (
        <div className='profiles-page'>
            <ProfilesPageSearchBar text={getSearchText()} />
            <div className='profiles-grid-container'>
                {profiles.map((profile) => (
                    <ProfilesPageItem profile={profile} />
                ))}
            </div>
        </div>
    );
}
