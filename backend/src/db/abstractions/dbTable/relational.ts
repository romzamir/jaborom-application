import DbTable from '.';

import {
    SearchOptions,
    SearchOptionsProperty,
    SearchOptionsQuery,
} from '../../../core/types/searchOptions';

const mapConditionNameToSql = new Map<string, string>([
    ['equals', '='],
    ['notEquals', '!='],
    ['gt', '>'],
    ['lt', '<'],
    ['gte', '>='],
    ['lte', '<='],
]);

export default abstract class RelationalDbTableBase extends DbTable {
    constructor(name: string) {
        super(name);
    }

    protected abstract escapeName(name: string): string;

    protected SearchOptionsToSqlCondition<T>(
        options: SearchOptions<T>,
    ): string {
        // SearchOptionsQuery<T>
        if (!!(options as any).$operator) {
            return this.SearchOptionsQueryToSqlCondition(
                options as SearchOptionsQuery<T>,
            );
        } /* SearchOptionsProperty<T> */ else {
            return this.SearchOptionsPropertyToSqlCondition(
                options as SearchOptionsProperty<T>,
            );
        }
    }

    protected SearchOptionsQueryToSqlCondition<T>(
        query: SearchOptionsQuery<T>,
    ): string {
        const sql = query.$operands
            .map((operand) => this.SearchOptionsToSqlCondition(operand))
            .join(` ${query.$operator} `);
        return `(${sql})`;
    }

    protected SearchOptionsPropertyToSqlCondition<T>(
        property: SearchOptionsProperty<T>,
    ): string {
        const operator =
            mapConditionNameToSql.get(property.condition.name) ?? '=';
        return `(${String(property.key)}${operator}${
            property.condition.value
        })`;
    }

    protected ObjectToInsertSql(object: any): string {
        const keys = Object.keys(object)
            .map((key) => this.escapeName(key))
            .join(',');
        const values = this.ObjectToValuesSql(object);

        return `(${keys}) VALUES (${values})`;
    }

    protected ObjectToValuesSql(object: any): string {
        return Object.values(object)
            .map((value) => `'${value}'`)
            .join(',');
    }
}
