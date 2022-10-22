import {ProfileType, Sibling} from '@jaborom/core';
import IDataProvider from '../provider';

export default interface IProfilesProvider extends IDataProvider {
    getAll(includeGraduates?: boolean): Promise<ProfileType[]>;
    checkIsProfileExists(profileId: number): Promise<boolean>;
    getById(
        id: number,
        includeGraduates?: boolean,
    ): Promise<ProfileType | null>;
    insert(profile: ProfileType): Promise<ProfileType | null>;
    update(id: number, profile: Partial<ProfileType>): Promise<void>;
    delete(id: number): Promise<boolean>;

    getSiblingsByProfileId(profileId: number): Promise<Sibling[] | null>;

    addSiblingToProfileId(
        profileId: number,
        siblings: Sibling,
    ): Promise<Sibling | null>;

    addSiblingsToProfileId(
        profileId: number,
        siblings: Sibling[],
    ): Promise<Sibling[] | null>;

    findProfiles(
        nameToSearch: string,
        includeGraduates?: boolean,
    ): Promise<ProfileType[]>;
}
