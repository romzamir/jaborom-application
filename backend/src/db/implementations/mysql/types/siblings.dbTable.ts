import {Sibling} from '../../../../core/types/sibling.type';
import {SearchOptions} from '../../../../core/types/searchOptions';
import ISiblingsDbTable from '../../../abstractions/types/siblings.dbTables';
import MySqlDbTable from '../DbTable';
import MySqlDbConnection from '../DbConnection';

export default class SiblingsMySqlDbTable
    extends MySqlDbTable
    implements ISiblingsDbTable
{
    constructor(name: string, connection: MySqlDbConnection) {
        super(name, connection);
    }

    async getSiblings(options?: SearchOptions<Sibling>): Promise<Sibling[]> {
        const sql =
            `SELECT * FROM ${this.escapeName(this._name)}` +
            (options
                ? 'WHERE ' + this.SearchOptionsToSqlCondition(options)
                : '');
        const result = await this.connection.query(sql);
        return result ?? [];
    }

    async insertSibling(sibling: Sibling): Promise<Sibling> {
        const sql =
            `INSERT INTO ${this.escapeName(this._name)} ` +
            this.ObjectToInsertSql(sibling);
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
            `DELETE FROM ${this.escapeName(this._name)} ` +
            ('WHERE ' + this.SearchOptionsToSqlCondition(options));
        const result = await this.connection.query(sql);
        return result.affectedRows;
    }
}
