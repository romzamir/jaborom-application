import { Profile } from '../../../core/types/profile.type';
import IDataProvider from '../provider';

export default interface IProfilesProvider extends IDataProvider {
    getAllProfiles(includeGraduates?: boolean): Promise<Profile[]>;
    getProfileByID(
        id: number,
        includeGraduates?: boolean
    ): Promise<Profile | null>;
    insertProfile(profile: Profile): Promise<Profile | null>;
    deleteProfile(id: number): Promise<boolean>;
}
