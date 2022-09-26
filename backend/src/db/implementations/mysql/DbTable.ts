import RelationalDbTableBase from '../../abstractions/dbTable/relational';
import MySqlDbConnection from './DbConnection';

export default abstract class MySqlDbTable extends RelationalDbTableBase {
    constructor(
        name: string,
        protected readonly connection: MySqlDbConnection,
    ) {
        super(name);
    }

    protected escapeName(name: string): string {
        return `\`${name}\``;
    }
}
