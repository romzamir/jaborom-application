import {
    SearchOptions,
    SearchOptionsProperty,
    SearchOptionsQuery,
} from '../../../core/types/searchOptions';
import DbTable from '../../abstractions/DbTable';
import MySqlDbConnection from './DbConnection';

const mapConditionNameToSql = new Map<string, string>([
    ['equals', '='],
    ['notEquals', '!='],
    ['gt', '>'],
    ['lt', '<'],
    ['gte', '>='],
    ['lte', '<='],
]);

export default abstract class MySqlDbTable extends DbTable {
    constructor(
        name: string,
        protected readonly connection: MySqlDbConnection
    ) {
        super(name);
    }

    public SearchOptionsToSqlCondition<T>(options: SearchOptions<T>): string {
        // SearchOptionsQuery<T>
        if (!!(options as any).$operator) {
            return this.SearchOptionsQueryToSqlCondition(
                options as SearchOptionsQuery<T>
            );
        } /* SearchOptionsProperty<T> */ else {
            return this.SearchOptionsPropertyToSqlCondition(
                options as SearchOptionsProperty<T>
            );
        }
    }

    private SearchOptionsQueryToSqlCondition<T>(
        query: SearchOptionsQuery<T>
    ): string {
        const sql = query.$operands
            .map((operand) => this.SearchOptionsToSqlCondition(operand))
            .join(` ${query.$operator} `);
        return `(${sql})`;
    }

    private SearchOptionsPropertyToSqlCondition<T>(
        property: SearchOptionsProperty<T>
    ): string {
        const operator =
            mapConditionNameToSql.get(property.condition.name) ?? '=';
        return `(${property.key}${operator}${property.condition.value})`;
    }

    public ObjectToInsertSql(object: any): string {
        const keys = Object.keys(object)
            .map((key) => `\`${key}\``)
            .join(',');
        const values = this.ObjectToValuesSql(object);

        return `(${keys}) VALUES (${values})`;
    }

    public ObjectToValuesSql(object: any): string {
        return Object.values(object)
            .map((value) => `'${value}'`)
            .join(',');
    }
}
