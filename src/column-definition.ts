import type { Func } from "@aster-js/core";

export interface ColumnDefinition<T = any> {
    readonly type: string;
    readonly header: Func<[], unknown>;
    readonly valuePredicate: Func<[T], unknown>;
    readonly allowSorting?: boolean;
    readonly allowFilter: boolean;
    readonly allowEdit: boolean;
}
