import { Func } from "@aster-js/core";
import { HTMLTemplateResult } from "lit";



export interface ColumnDefinition<T = any> {
    readonly type: string;
    readonly header: HTMLTemplateResult;
    readonly valuePredicate: Func<[T], HTMLTemplateResult>;
    readonly allowSorting?: boolean;
    readonly allowFilter: boolean;
    readonly allowEdit: boolean;
}
