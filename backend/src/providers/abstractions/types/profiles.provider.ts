import { Profile } from '../../../core/types/profile.type';
import IDataProvider from '../provider';

export default interface IProfilesProvider extends IDataProvider<Profile> {
    getAllProfiles(): Promise<Profile[]>;
    getProfileByID(id: string): Promise<Profile | null>;
    insertProfile(profile: Profile): Promise<Profile | null>;
    deleteProfile(id: string): Promise<Profile | null>;
}
