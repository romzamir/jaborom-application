import {Profile} from '../../../../core/types/profile.type';
import {ProfilesSearchOptions} from '../../../../core/types/searchOptions/profiles.type';
import IProfilesDbTable from '../../../abstractions/types/profiles.dbTable';
import MSSqlDbConnection from '../DbConnection';
import MSSqlDbTable from '../DbTable';

export default class ProfilesMSSqlDbTable
    extends MSSqlDbTable
    implements IProfilesDbTable
{
    constructor(name: string, connection: MSSqlDbConnection) {
        super(name, connection);
    }

    async getProfiles(options?: ProfilesSearchOptions): Promise<Profile[]> {
        const sql =
            `SELECT * FROM [${this._name}]` +
            (options && options.additional
                ? 'WHERE ' +
                  this.SearchOptionsToSqlCondition(options.additional)
                : '');
        const result = await this.connection.query(sql);
        return result.recordset;
    }

    async checkIsProfileExists(
        options: Required<ProfilesSearchOptions>,
    ): Promise<boolean> {
        const result = await this.connection.query(
            `SELECT [id] FROM ${this._name} WHERE ` +
                this.SearchOptionsToSqlCondition(options.additional),
        );

        return result.recordset.length > 0;
    }

    async insertProfile(profile: Profile): Promise<Profile> {
        const insertSql = this.ObjectToInsertSql(profile);
        const sql = `INSERT INTO [${this._name}] ${insertSql}; SELECT SCOPE_IDENTITY();`;
        const result = await this.connection.query(sql);
        const insertedId = result.recordset?.[0]?.[''];
        if (!!insertedId) {
            return {
                ...profile,
                id: insertedId,
            };
        } else {
            throw new Error('Failed creating profile');
        }
    }

    updateProfile(
        options: Required<ProfilesSearchOptions>,
        profile: Partial<Profile>,
    ): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async deleteProfile(
        options: Required<ProfilesSearchOptions>,
    ): Promise<number> {
        const sql =
            `DELETE FROM [${this._name}] ` +
            ('WHERE ' + this.SearchOptionsToSqlCondition(options.additional));
        const result = await this.connection.query(sql);
        return result.affectedRows;
    }

    async findProfiles(
        nameToSearch: string,
        includeGraduates: boolean = false,
    ): Promise<Profile[]> {
        const sql = `SELECT * FROM [${this._name}] WHERE CONCAT(firstName, ' ', lastName) LIKE '%${nameToSearch}%'`;
        const result = await this.connection.query(sql);
        return result.recordset;
    }
}
