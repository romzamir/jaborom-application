import {ProfileType} from '@jaborom/core';
import {ProfilesSearchOptions} from '../../../core/types/searchOptions/profiles.type';

export default interface IProfilesDbTable {
    get(options?: ProfilesSearchOptions): Promise<ProfileType[]>;

    isExists(options: ProfilesSearchOptions): Promise<boolean>;

    insert(profile: ProfileType): Promise<ProfileType>;

    update(
        options: Required<ProfilesSearchOptions>,
        profile: Partial<ProfileType>,
    ): Promise<boolean>;

    delete(options: Required<ProfilesSearchOptions>): Promise<number>;

    findByFullName(
        nameToSearch: string,
        includeGraduates?: boolean,
    ): Promise<ProfileType[]>;
}
