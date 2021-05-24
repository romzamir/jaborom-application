import { Profile } from '../../../../core/types/profile.type';
import IProfilesDbTable from '../../../abstractions/types/profiles.dbTable';
import { ProfilesSearchOptions } from '../../../../core/types/searchOptions/profiles.type';

export default class ProfilesMySqlDbTable implements IProfilesDbTable {
    getProfiles(options?: ProfilesSearchOptions): Promise<Profile[]> {
        throw new Error('Method not implemented.');
    }

    insertProfile(profile: Profile): Promise<Profile> {
        throw new Error('Method not implemented.');
    }

    updateProfile(
        options: Required<ProfilesSearchOptions>,
        profile: Profile
    ): Promise<Profile> {
        throw new Error('Method not implemented.');
    }

    deleteProfile(options: Required<ProfilesSearchOptions>): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}
