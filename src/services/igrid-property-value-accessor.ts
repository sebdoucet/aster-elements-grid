import { ServiceIdentifier } from "@aster-js/ioc";
import { ColumnDefinition, GridDataItem } from "../column-definition";

export type GridPropertyAccessorDelegate = (item: GridDataItem) => unknown;

export const IGridPropertyValueAccessor = ServiceIdentifier<IGridPropertyValueAccessor>("IGridPropertyValueAccessor");

export interface IGridPropertyValueAccessor {
    getValue(item: GridDataItem, definition: ColumnDefinition): unknown;
    resolveAccessor(definition: ColumnDefinition): GridPropertyAccessorDelegate;
}
