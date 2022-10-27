import {SiblingType} from '@jaborom/core';
import {SearchOptions} from '../../../../core/types/searchOptions';
import ISiblingsDbTable from '../../../abstractions/types/siblings.dbTables';
import MSSqlDbTable from '../DbTable';
import MSSqlDbConnection from '../DbConnection';

export default class SiblingsMSSqlDbTable
    extends MSSqlDbTable
    implements ISiblingsDbTable
{
    constructor(name: string, connection: MSSqlDbConnection) {
        super(name, connection);
    }

    async getSiblings(options?: SearchOptions<SiblingType>): Promise<SiblingType[]> {
        const sql =
            `SELECT * FROM [${this._name}]` +
            (options
                ? 'WHERE ' + this.searchOptionsToSqlCondition(options)
                : '');
        const result = await this.connection.query(sql);
        return result ?? [];
    }

    async insertSibling(sibling: SiblingType): Promise<SiblingType> {
        const sql =
            `INSERT INTO [${this._name}] ` + this.objectToInsertSql(sibling);
        const newSibling = {...sibling};
        const result = await this.connection.query(sql);
        if (!!result.insertId) {
            newSibling.id = result.insertId;
        } else {
            throw new Error('Failed creating sibling');
        }

        return newSibling;
    }

    async insertSiblings(siblings: SiblingType[]): Promise<SiblingType[]> {
        const results: SiblingType[] = [];
        for (const sibling of siblings) {
            results.push(await this.insertSibling(sibling));
        }

        return results;
    }

    updateSibling(
        options: SearchOptions<SiblingType>,
        sibling: SiblingType,
    ): Promise<SiblingType> {
        throw new Error('Method not implemented.');
    }

    async deleteSiblings(options: SearchOptions<SiblingType>): Promise<number> {
        const sql =
            `DELETE FROM [${this._name}] ` +
            ('WHERE ' + this.searchOptionsToSqlCondition(options));
        const result = await this.connection.query(sql);
        return result.affectedRows;
    }
}
