import _ from 'lodash';
import {AxiosResponse} from 'axios';
import {useCallback} from 'react';
import {useLocation} from 'react-router-dom';
import {ProfilesPageItem} from './profilesPageItem';
import {ProfilesPageSearchBar} from './profilesPageSearchBar';
import {useAuthorize, useFetch, useUser} from '../../../hooks';

import {ProfileDb} from '../../../core/types/profileDb.type';

import {profilesProvider} from '../../../api/providers/profiles.provider';

import './profilesPage.css';

export function ProfilesPage() {
    const user = useUser();
    const isAuthorized = useAuthorize(user);
    const location = useLocation();
    const searchText = new URLSearchParams(location.search).get('search') || '';

    const performSearch = useCallback(() => {
        if (_.isEmpty(searchText)) {
            return profilesProvider.getAll();
        }

        return profilesProvider.search(searchText);
    }, [searchText]);

    const [isLoading, profilesResult] =
        useFetch<AxiosResponse<ProfileDb[]>>(performSearch);

    if (!isAuthorized) return null;

    return (
        <div className='profiles-page'>
            <ProfilesPageSearchBar text={searchText} />
            <div className='profiles-grid-container'>
                {isLoading ? (
                    <div>LOADING...</div>
                ) : _.isEmpty(profilesResult?.data) ? (
                    <div>לא נמצאו</div>
                ) : (
                    profilesResult?.data.map((profile) => (
                        <ProfilesPageItem key={profile.id} profile={profile} />
                    ))
                )}
            </div>
        </div>
    );
}
