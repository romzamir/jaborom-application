import {restCommunicator} from '../../api/restCommunicator';
import {backendRoutes} from '../../core/constants/backendRoutes.constants';

import {Profile} from '../../core/models/profile';
import {ProfileDb} from '../../core/types/profileDb.type';
import {wrapCancelablePromise} from '../../utils/cancelablePromise';

export const profilesProvider = ((window as any).profilesProvider = {
    getAllProfiles,
    getProfile,
    searchProfiles,
});

function getAllProfiles(limit: number = 20) {
    return restCommunicator.get<ProfileDb[]>(backendRoutes.profiles, {limit});
}

function getProfile(id: number | string) {
    return wrapCancelablePromise(
        restCommunicator.get<Profile>(`${backendRoutes.profiles}/${id}`),
        async (promise) => {
            const response = await promise;
            if (!response.data) return;

            response.data = new Profile(response.data);
        },
    );
}

function searchProfiles(searchText: string, limit: number = 20) {
    return restCommunicator.get<ProfileDb[]>(backendRoutes.profiles, {
        searchText,
        limit,
    });
}
