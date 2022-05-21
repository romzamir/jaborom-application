import _ from 'lodash';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {ProfilesPageItem} from './profilesPageItem';
import {ProfilesPageSearchBar} from './profilesPageSearchBar';

import {Profile} from '../../../core/types/profile.type';

import {profilesProvider} from '../../../api/providers/profiles.provider';

import './profilesPage.css';
import {AxiosResponse} from 'axios';

export function ProfilesPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const location = useLocation();

    useEffect(() => {
        const searchText = getSearchText(location.search);
        const searchPromise = performSearch(searchText);
        searchPromise.then(onSearchResponse);
        return searchPromise.cancel;
    }, [location]);

    const getSearchText = (search: string) => {
        return new URLSearchParams(search).get('search') || '';
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
    };

    return (
        <div className='profiles-page'>
            <ProfilesPageSearchBar text={getSearchText(location.search)} />
            <div className='profiles-grid-container'>
                {isLoading ? (
                    <div>LOADING...</div>
                ) : profiles.length === 0 ? (
                    <div>לא נמצאו</div>
                ) : (
                    profiles.map((profile) => <ProfilesPageItem key={profile.id} profile={profile} />)
                )}
            </div>
        </div>
    );
}
