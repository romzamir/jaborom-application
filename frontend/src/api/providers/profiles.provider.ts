import {restCommunicator} from '../../api/restCommunicator';
import {backendRoutes} from '../../core/constants/backendRoutes.constants';

import {Profile} from '../../core/types/profile.type';
import {ProfileDb} from '../../core/types/profileDb.type';

export const profilesProvider = ((window as any).profilesProvider = {
    getAllProfiles,
    getProfile,
    searchProfiles,
});

function getAllProfiles(limit: number = 20) {
    return restCommunicator.get<ProfileDb[]>(backendRoutes.profiles, {limit});
}

function getProfile(id: number | string) {
    return restCommunicator.get<Profile>(`${backendRoutes.profiles}/${id}`);
}

function searchProfiles(searchText: string, limit: number = 20) {
    return restCommunicator.get<ProfileDb[]>(backendRoutes.profiles, {
        searchText,
        limit,
    });
}
