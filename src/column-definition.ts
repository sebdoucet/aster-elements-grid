import { Func } from "@aster-js/core";
import { ItemValue } from "./item-value";
import { RenderResult } from "./services/render-result";

export type GridDataItem = { readonly [key: string]: unknown };

export type GridItemValueCoerceDelegate = (value: unknown, item: GridDataItem, definition: ColumnDefinition) => unknown;

export type GridItemValueFormatterDelegate = (value: unknown, item: GridDataItem, definition: ColumnDefinition) => RenderResult;

export type ColumnDefinition =
    TextColumnDefinition
    | NumberColumnDefinition
    | CustomColumnDefinition
    | HtmlColumnDefinition;

export namespace ColumnDefinition {
    export function autoColumns(...properties: string[]): ColumnDefinition[] {
        return properties.map(p => ({
            type: "text",
            header: p,
            path: p
        }));
    }
}

export interface IColumnFeatureOptions {
    readonly allowSorting?: boolean;
    readonly allowFilter?: boolean;
    readonly allowEdit?: boolean;
}

export interface IColumnPropertyOptions {
    /** Path to the value */
    readonly path: string;
    /** A default value used if the property is undefined, not having the good type or if null and `ignoreNull` is configured at true */
    readonly defaultValue?: any;
    /** Will fallback on default value if the value of the property is null */
    readonly ignoreNull?: boolean;
    /** Coerce the property value */
    readonly coerce?: GridItemValueCoerceDelegate;
}

export interface IColumnDefinition extends IColumnFeatureOptions, IColumnPropertyOptions {
    readonly header: RenderResult;
    readonly headerStyle?: string;
    readonly headerClasses?: string;
    readonly cellStyle?: ItemValue<GridDataItem, string>;
    readonly cellClasses?: ItemValue<GridDataItem, string>;
    readonly formatter?: GridItemValueFormatterDelegate;
}

export type TextColumnDefinition = IColumnDefinition & {
    readonly type: "text";
}

export type NumberColumnDefinition = IColumnDefinition & {
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

export type CustomGridCellRendererDelegate = (value: unknown, item: GridDataItem, definition: CustomColumnDefinition) => unknown;

export type CustomColumnDefinition = IColumnDefinition & {
    readonly type: "custom";
    /** Callback used to render the cell */
    cellRenderer: CustomGridCellRendererDelegate;
}


export type HtmlColumnDefinition = IColumnDefinition & {
    readonly type: "html";
}
