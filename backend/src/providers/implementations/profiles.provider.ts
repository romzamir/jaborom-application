import { Profile } from '../../core/types/profile.type';
import IProfilesProvider from '../abstractions/types/profiles.provider';

export default class ProfilesProvider implements IProfilesProvider {
    name = 'profiles';

    getAllProfiles(): Promise<Profile[]> {
        throw new Error('Method not implemented.');
    }

    getProfileByID(id: string): Promise<Profile | null> {
        throw new Error('Method not implemented.');
    }

    insertProfile(profile: Profile): Promise<Profile | null> {
        throw new Error('Method not implemented.');
    }

    deleteProfile(id: string): Promise<Profile | null> {
        throw new Error('Method not implemented.');
    }
}
