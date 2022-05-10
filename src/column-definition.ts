import { Func } from "@aster-js/core";
import { ItemValue } from "./item-value";
import { RenderResult } from "./services/render-result";

export type ColumnDefinition<T = any> =
    TextColumnDefinition<T>
    | NumberColumnDefinition<T>
    | CustomColumnDefinition<T>;

export interface IColumnDefinition<T = any> {
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

export type TextColumnDefinition<T = any> = IColumnDefinition<T> & {
    readonly type: "text";
}

export type NumberColumnDefinition<T = any> = IColumnDefinition<T> & {
    readonly type: "number";
    /** Indicate the precision, default will render the entire number */
    readonly precision?: number;
    /** Indicate whether or not the precision should render a formats a fixed-point notation */
    readonly fixed?: boolean;
    /** Indicate the unit to append at the end of the number */
    readonly unit?: string;
    /** Provide an alternate text for non number values */
    readonly NaNText?: string;
}

export type CustomGridCellRendererDelegate<T = any> = (value: any, item: T, definition: CustomColumnDefinition<T>) => unknown;

export type CustomColumnDefinition<T = any> = IColumnDefinition<T> & {
    readonly type: "custom";
    /** Callback used to render the cell */
    cellRenderer: CustomGridCellRendererDelegate<T>;
}
