export type SearchOptions<T> = SearchOptionsQuery<T> | SearchOptionsProperty<T>;

export type SearchOptionsQuery<T> = {
    $left: SearchOptions<T>;
    $operator: SearchOptionsQueryOperator;
    $right: SearchOptions<T>;
};

export type SearchOptionsQueryOperator = 'OR' | 'AND';

export type SearchOptionsProperty<T> = {
    key: keyof T;
    condition: SearchOptionsPropertyCondition;
};

export type SearchOptionsPropertyCondition =
    | SearchOptionsPropertyConditionAny
    | SearchOptionsPropertyConditionIn
    | SearchOptionsPropertyConditionNumber;

export type SearchOptionsPropertyConditionAny = {
    name: 'equals' | 'notEquals';
    value: any;
};

export type SearchOptionsPropertyConditionIn = {
    name: 'in';
    value: any[] | string;
};

export type SearchOptionsPropertyConditionNumber = {
    name: 'lt' | 'gt' | 'lte' | 'gte';
    value: number;
};
