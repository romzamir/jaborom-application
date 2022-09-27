import {Profile} from '../../../core/types/profile.type';
import {ProfilesSearchOptions} from '../../../core/types/searchOptions/profiles.type';

export default interface IProfilesDbTable {
    get(options?: ProfilesSearchOptions): Promise<Profile[]>;

    isExists(options: ProfilesSearchOptions): Promise<boolean>;

    insert(profile: Profile): Promise<Profile>;

    update(
        options: Required<ProfilesSearchOptions>,
        profile: Partial<Profile>,
    ): Promise<boolean>;

    delete(options: Required<ProfilesSearchOptions>): Promise<number>;

    findByFullName(
        nameToSearch: string,
        includeGraduates?: boolean,
    ): Promise<Profile[]>;
}
