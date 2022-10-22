import RelationalDbTableBase from '../../abstractions/dbTable/relational';
import MSSqlDbConnection from './DbConnection';

export default abstract class MSSqlDbTable extends RelationalDbTableBase {
    constructor(
        name: string,
        protected readonly connection: MSSqlDbConnection,
    ) {
        super(name);
    }

    protected escapeName(name: string): string {
        return `[${name}]`;
    }
}
