import DbTable from '../../abstractions/DbTable';
import MySqlDbConnection from './DbConnection';

export default class MySqlDbTable extends DbTable {
    constructor(
        name: string,
        protected readonly connection: MySqlDbConnection
    ) {
        super(name);
    }
}
