import {Sibling} from '../../../../core/types/sibling.type';
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

    async getSiblings(options?: SearchOptions<Sibling>): Promise<Sibling[]> {
        const sql =
            `SELECT * FROM [${this._name}]` +
            (options
                ? 'WHERE ' + this.SearchOptionsToSqlCondition(options)
                : '');
        const result = await this.connection.query(sql);
        return result ?? [];
    }

    async insertSibling(sibling: Sibling): Promise<Sibling> {
        const sql =
            `INSERT INTO [${this._name}] ` + this.ObjectToInsertSql(sibling);
        const newSibling = {...sibling};
        const result = await this.connection.query(sql);
        if (!!result.insertId) {
            newSibling.id = result.insertId;
        } else {
            throw new Error('Failed creating sibling');
        }

        return newSibling;
    }

    async insertSiblings(siblings: Sibling[]): Promise<Sibling[]> {
        const results: Sibling[] = [];
        for (const sibling of siblings) {
            results.push(await this.insertSibling(sibling));
        }

        return results;
    }

    updateSibling(
        options: SearchOptions<Sibling>,
        sibling: Sibling,
    ): Promise<Sibling> {
        throw new Error('Method not implemented.');
    }

    async deleteSiblings(options: SearchOptions<Sibling>): Promise<number> {
        const sql =
            `DELETE FROM [${this._name}] ` +
            ('WHERE ' + this.SearchOptionsToSqlCondition(options));
        const result = await this.connection.query(sql);
        return result.affectedRows;
    }
}
