import {restCommunicator} from '../../api/restCommunicator';
import {backendRoutes} from '../../core/constants/backendRoutes.constants';
import {Profile, ProfileType, wrapCancelablePromise} from '@jaborom/core';

export const profilesProvider = ((window as any).profilesProvider = {
    getAll,
    getById,
    search,
    update,
});

function getAll(limit: number = 20) {
    return restCommunicator.get<ProfileType[]>(backendRoutes.profiles, {limit});
}

function getById(id: number | string) {
    return wrapCancelablePromise(
        restCommunicator.get<Profile>(`${backendRoutes.profiles}/${id}`),
        async (promise) => {
            const response = await promise;
            if (!response.data) return;

            response.data = Profile.from(response.data);
        },
    );
}

function search(searchText: string, limit: number = 20) {
    return restCommunicator.get<ProfileType[]>(backendRoutes.profiles, {
        searchText,
        limit,
    });
}

function update(id: string | number, profileChanges: Partial<Profile>) {
    return restCommunicator.put(
        backendRoutes.profiles + `/${id}`,
        Profile.toJson(profileChanges),
    );
}
