import { Func } from "@aster-js/core";
import { ItemValue } from "./item-value";
import { RenderResult } from "./services/render-result";


export interface ColumnDefinition<T = any> {
    readonly type?: string;
    readonly header: RenderResult;
    readonly headerStyle?: string;
    readonly headerClasses?: string;
    readonly cellStyle?: ItemValue<T, string>;
    readonly cellClasses?: ItemValue<T, string>;
    readonly property: string;
    readonly formatter?: Func<[T], RenderResult>;
    readonly allowSorting?: boolean;
    readonly allowFilter?: boolean;
    readonly allowEdit?: boolean;
}
