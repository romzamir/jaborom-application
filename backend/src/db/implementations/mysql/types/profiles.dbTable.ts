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
            `SELECT * FROM \`${this._name}\`` +
            (options && options.additional
                ? 'WHERE ' +
                  this.SearchOptionsToSqlCondition(options.additional)
                : '');
        const result = await this.connection.query(sql);
        return result ?? [];
    }

    async insertProfile(profile: Profile): Promise<Profile> {
        const sql =
            `INSERT INTO \`${this._name}\` ` + this.ObjectToInsertSql(profile);
        const newProfile = { ...profile };
        const result = await this.connection.query(sql);
        if (!result.insertId) {
            newProfile.id = result.insertId;
        } else {
            throw new Error('Failed creating profile');
        }

        return newProfile;
    }

    updateProfile(
        options: Required<ProfilesSearchOptions>,
        profile: Profile
    ): Promise<Profile> {
        throw new Error('Method not implemented.');
    }

    async deleteProfile(
        options: Required<ProfilesSearchOptions>
    ): Promise<number> {
        const sql =
            `DELETE FROM \`${this._name}\` ` +
            ('WHERE ' + this.SearchOptionsToSqlCondition(options.additional));
        const result = await this.connection.query(sql);
        return result.affectedRows;
    }
}
