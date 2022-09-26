import {Profile} from '../../../core/types/profile.type';
import {ProfilesSearchOptions} from '../../../core/types/searchOptions/profiles.type';

export default interface IProfilesDbTable {
    getProfiles(options?: ProfilesSearchOptions): Promise<Profile[]>;

    checkIsProfileExists(options: ProfilesSearchOptions): Promise<boolean>;

    insertProfile(profile: Profile): Promise<Profile>;

    updateProfile(
        options: Required<ProfilesSearchOptions>,
        profile: Profile,
    ): Promise<Profile>;

    deleteProfile(options: Required<ProfilesSearchOptions>): Promise<number>;

    findProfiles(
        nameToSearch: string,
        includeGraduates?: boolean,
    ): Promise<Profile[]>;
}
