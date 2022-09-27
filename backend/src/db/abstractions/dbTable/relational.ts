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

    protected searchOptionsToSqlCondition<T>(
        options: SearchOptions<T>,
    ): string {
        // SearchOptionsQuery<T>
        if (!!(options as any).$operator) {
            return this.searchOptionsQueryToSqlCondition(
                options as SearchOptionsQuery<T>,
            );
        } /* SearchOptionsProperty<T> */ else {
            return this.searchOptionsPropertyToSqlCondition(
                options as SearchOptionsProperty<T>,
            );
        }
    }

    protected searchOptionsQueryToSqlCondition<T>(
        query: SearchOptionsQuery<T>,
    ): string {
        const sql = query.$operands
            .map((operand) => this.searchOptionsToSqlCondition(operand))
            .join(` ${query.$operator} `);
        return `(${sql})`;
    }

    protected searchOptionsPropertyToSqlCondition<T>(
        property: SearchOptionsProperty<T>,
    ): string {
        const key = String(property.key);
        const operator =
            mapConditionNameToSql.get(property.condition.name) ?? '=';
        const value = property.condition.value;
        return `(${key}${operator}${value})`;
    }

    protected objectToInsertSql(object: any): string {
        const keys = Object.keys(object)
            .map((key) => this.escapeName(key))
            .join(',');
        const values = this.objectToValuesSql(object);

        return `(${keys}) VALUES (${values})`;
    }

    protected objectToValuesSql(object: any): string {
        return Object.values(object)
            .map((value) => `'${value}'`)
            .join(',');
    }

    protected objectToSetSql(object: any): string {
        return Object.entries(object)
            .filter(([_key, value]) => value !== undefined)
            .map(
                ([key, value]) =>
                    `${this.escapeName(key)}=${this.valueToSqlString(value)}`,
            )
            .join(',');
    }

    protected valueToSqlString(value: any): string {
        if (typeof value === 'string') return `'${value}'`;
        if (typeof value === 'number') return `'${value}'`;
        if (value instanceof Date) return `'${value.toISOString()}'`;
        if (value === null) return 'NULL';
        if (typeof value === 'object' && value !== null)
            throw new Error('Value cannot be an object');

        throw new Error('Invalid value: ' + value);
    }
}
