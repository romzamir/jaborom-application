import {restCommunicator} from 'api/restCommunicator';
import {backendRoutes} from 'core/constants/backendRoutes.constants';

export const profilesProvider = ((window as any).profilesProvider = {
    getAllProfiles,
    getProfile,
    searchProfiles,
});

function getAllProfiles(limit: number = 20) {
    return restCommunicator.get(backendRoutes.profiles, {limit});
}

function getProfile(id: number) {
    return restCommunicator.get(`${backendRoutes.profiles}/${id}`);
}

function searchProfiles(searchText: string, limit: number = 20) {
    return restCommunicator.get(backendRoutes.profiles, {searchText, limit});
}
