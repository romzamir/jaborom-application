import { Profile } from '../../../../core/types/profile.type';
import { ProfilesSearchOptions } from '../../../../core/types/searchOptions/profiles.type';
import IProfilesDbTable from '../../../abstractions/types/profiles.dbTable';
import MySqlDbTable from '../DbTable';
import MySqlDbConnection from '../DbConnection';

export default class ProfilesMySqlDbTable
    extends MySqlDbTable
    implements IProfilesDbTable
{
    constructor(name: string, connection: MySqlDbConnection) {
        super(name, connection);
    }

    async getProfiles(options?: ProfilesSearchOptions): Promise<Profile[]> {
        const sql =
            `SELECT * FROM ${this._name}` +
            (options && options.additional
                ? 'WHERE ' +
                  this.SearchOptionsToSqlCondition(options.additional)
                : '');
        const result = await this.connection.query(sql);
        return result ?? [];
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
