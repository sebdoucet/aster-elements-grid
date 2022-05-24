import { ServiceIdentifier } from "@aster-js/ioc";
import { ColumnDefinition, GridDataItem } from "../column-definition";
import { ColumnTypeHandler } from "../column-type";

export const IGridDataType = ServiceIdentifier<IGridDataTypeImpl>("IGridDataType");

export interface IGridDataTypeImpl<T = any> {

    /** Coerce the value for further usage */
    coerce(value: unknown, item: GridDataItem, definition: ColumnDefinition): T | null;

    /** Sort 2 coerced values */
    sort?(value1: T | null, value2: T | null, definition: ColumnDefinition): number;
}

export type IGridDataType = ColumnTypeHandler<IGridDataTypeImpl>;
