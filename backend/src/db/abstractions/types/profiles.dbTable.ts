import { Profile } from '../../../core/types/profile.type';
import { SearchOptions } from '../../../core/types/searchOptions';
import { ProfilesSearchOptions } from '../../../core/types/searchOptions/profiles.type';

export default interface IProfilesDbTable {
    getProfiles(options?: ProfilesSearchOptions): Promise<Profile[]>;

    insertProfile(profile: Profile): Promise<Profile>;

    updateProfile(
        options: SearchOptions<Profile>,
        profile: Profile
    ): Promise<Profile>;

    deleteProfile(options: SearchOptions<Profile>): Promise<boolean>;
}
