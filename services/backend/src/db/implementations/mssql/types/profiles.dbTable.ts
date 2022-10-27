import {ProfileType} from '@jaborom/core';
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

    async get(options?: ProfilesSearchOptions): Promise<ProfileType[]> {
        const sql =
            `SELECT * FROM [${this._name}]` +
            (options && options.additional
                ? 'WHERE ' +
                  this.searchOptionsToSqlCondition(options.additional)
                : '');
        const result = await this.connection.query(sql);
        return result.recordset;
    }

    async isExists(options: Required<ProfilesSearchOptions>): Promise<boolean> {
        const result = await this.connection.query(
            `SELECT [id] FROM ${this._name} WHERE ` +
                this.searchOptionsToSqlCondition(options.additional),
        );

        return result.recordset.length > 0;
    }

    async insert(profile: ProfileType): Promise<ProfileType> {
        const insertSql = this.objectToInsertSql(profile);
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

    async update(
        options: Required<ProfilesSearchOptions>,
        profile: Partial<ProfileType>,
    ): Promise<boolean> {
        const setSql = this.objectToSetSql(profile);
        const whereSql = this.searchOptionsToSqlCondition(options.additional);
        const sql = `UPDATE [${this._name}] SET ${setSql} WHERE ${whereSql}`;
        const result = await this.connection.query(sql);
        return result.rowsAffected[0] > 0;
    }

    async delete(options: Required<ProfilesSearchOptions>): Promise<number> {
        const sql =
            `DELETE FROM [${this._name}] ` +
            ('WHERE ' + this.searchOptionsToSqlCondition(options.additional));
        const result = await this.connection.query(sql);
        return result.affectedRows;
    }

    async findByFullName(
        nameToSearch: string,
        includeGraduates: boolean = false,
    ): Promise<ProfileType[]> {
        const sql = `SELECT * FROM [${this._name}] WHERE CONCAT(firstName, ' ', lastName) LIKE '%${nameToSearch}%'`;
        const result = await this.connection.query(sql);
        return result.recordset;
    }
}
