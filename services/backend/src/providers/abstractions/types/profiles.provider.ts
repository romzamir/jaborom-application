import {Profile} from '../../../core/types/profile.type';
import {Sibling} from '../../../core/types/sibling.type';
import IDataProvider from '../provider';

export default interface IProfilesProvider extends IDataProvider {
    getAll(includeGraduates?: boolean): Promise<Profile[]>;
    checkIsProfileExists(profileId: number): Promise<boolean>;
    getById(id: number, includeGraduates?: boolean): Promise<Profile | null>;
    insert(profile: Profile): Promise<Profile | null>;
    update(id: number, profile: Partial<Profile>): Promise<void>;
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
    ): Promise<Profile[]>;
}
